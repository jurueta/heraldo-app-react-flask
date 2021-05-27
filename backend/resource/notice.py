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
        if id_notice:
            notices = self.session.execute(select(Notice).where(Notice.status == 1, Notice.id == id_notice)).all()
        else:
            notices = self.session.execute(select(Notice).where(Notice.status == 1)).all()
        data = self._format_data_notice(notices)
        return data, 200

    @jwt_required()
    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument('titulo', type=str, required=True, help="Por favor ingrese un titulo valido")
        parser.add_argument('descripcion', type=str, required=True, help="Por favor ingrese una descripcion valida")
        parser.add_argument('resena', type=str, required=True, help="Por favor ingrese una resena valida")
        parser.add_argument('imagen', type=str, required=True, help="Por favor ingrese una imagen valida")
        parser.add_argument('autor', type=str, required=True, help="Por favor ingrese un autor valido")
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

    @jwt_required()
    def put(self, id_notice):
        parser = reqparse.RequestParser()

        parser.add_argument('titulo', type=str, help="Por favor ingrese un titulo valido")
        parser.add_argument('descripcion', type=str, help="Por favor ingrese una descripcion valida")
        parser.add_argument('resena', type=str, help="Por favor ingrese una resena valida")
        parser.add_argument('imagen', type=str, help="Por favor ingrese una imagen valida")
        parser.add_argument('autor', type=str, help="Por favor ingrese un autor valido")
        parser.add_argument('categoria', type=int, help="Por favor ingrese una categoria valido")
        parser.add_argument('visible', type=inputs.regex('^[0-9]*$'), help="Por favor ingrese un valor visible valido")

        args = parser.parse_args()

        if args['imagen']:
            global_f.base64_to_file(args)

        args = {i: j for i, j in args.items() if j}
        
        try:
            self.session.execute(update(Notice).where(Notice.id == id_notice).values(**args))
            self.session.commit()
            notice = self.session.execute(select(Notice).where(Notice.id == id_notice)).first()
            return self._format_data_notice([notice])
        except Exception as error :
            return {"message" : error}, 400
    
    @jwt_required()
    def delete(self, id_notice):
        try:
            self.session.execute(update(Notice).where(Notice.id == id_notice).values(status=0))
            self.session.commit()
            return {'message': 'ok'}, 200
        except Exception as error :
            return {"message" : error}, 400



    def _format_data_notice(self, notices):
        data = []
        for notice in notices:
            imagen = global_f.format_url_image(notice[0].imagen, request.host_url)
            reg = {
                'id': notice[0].id,
                'titulo': notice[0].titulo,
                'descripcion': notice[0].descripcion,
                'resena': notice[0].resena,
                'categoria': notice[0].categoria,
                'imagen': imagen,
                'autor': notice[0].autor,
                'visible': notice[0].visible,
                'hora': str(notice[0].hora),
            }

            data.append(reg)
        return data