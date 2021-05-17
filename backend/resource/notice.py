from flask_restful import Resource, reqparse, inputs
from flask import abort, request
from sqlalchemy import select, update, delete
from flask_jwt import jwt_required
from models import Notice
import global_func as global_f
from sqlalchemy.exc import IntegrityError
import hashlib

class NoticeRest(Resource):
    def __init__(self):
        super().__init__()
        try:
            self.session = global_f.connect_db()
            pass
        except Exception as error:
            abort(500, f"Error connect with DB")
    
    def get(self, id_notice=None):
        condition = f"AND id = {id_notice}" if id_notice else ""
        
        notices = self.session.execute(select(Notice).where(Notice.status == 1)).all()
        data = self._format_data_notice(notices)
        return data, 200

    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument('titulo', type=global_f.validatestr, required=True, help="Por favor ingrese un titulo valido")
        parser.add_argument('descripcion', type=str, required=True, help="Por favor ingrese una descripcion valida")
        parser.add_argument('resena', type=str, required=True, help="Por favor ingrese una resena valida")
        parser.add_argument('imagen', type=str, required=True, help="Por favor ingrese una imagen valida")
        parser.add_argument('autor', type=global_f.validatestr, required=True, help="Por favor ingrese un autor valido")
        parser.add_argument('categoria', type=int, required=True, help="Por favor ingrese una categoria valido")

        args = parser.parse_args()

        global_f.base64_to_file(args)

        try:
            new_notice = Notice(**args)
            self.session.add(new_notice)
            self.session.flush()
            self.session.commit()
            return self._format_data_notice([(new_notice,)])
        except Exception as error :
            return {"message" : error}, 400
    
    def put(self, id_notice):
        parser = reqparse.RequestParser()

        parser.add_argument('titulo', type=global_f.validatestr, help="Por favor ingrese un titulo valido")
        parser.add_argument('descripcion', type=str, help="Por favor ingrese una descripcion valida")
        parser.add_argument('resena', type=str, help="Por favor ingrese una resena valida")
        parser.add_argument('imagen', type=str, help="Por favor ingrese una imagen valida")
        parser.add_argument('autor', type=global_f.validatestr, help="Por favor ingrese un autor valido")
        parser.add_argument('categoria', type=int, help="Por favor ingrese una categoria valido")

        args = parser.parse_args()

        if args['imagen']:
            global_f.base64_to_file(args)

        try:
            self.session.execute(update(Notice).where(Notice.id == id_notice).values(**args))
            self.session.commit()
            notice = self.session.execute(select(Notice).where(Notice.id == id_notice)).first()
            return self._format_data_notice([notice])
        except Exception as error :
            return {"message" : error}, 400
    
    def delete(self, id_notice):
        try:
            self.session.execute(delete(Notice).where(Notice.id == id_notice))
            self.session.commit()
            return {'message': 'ok'}, 200
        except Exception as error :
            return {"message" : error}, 400



    def _format_data_notice(self, notices):
        data = []
        for notice in notices:
            reg = {
                'id': notice[0].id,
                'titulo': notice[0].titulo,
                'descripcion': notice[0].descripcion,
                'resena': notice[0].resena,
                'imagen': notice[0].imagen,
                'autor': notice[0].autor,
                'visible': notice[0].visible,
                'hora': str(notice[0].hora),
            }

            data.append(reg)
        return data