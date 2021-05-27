from flask_restful import Resource, reqparse
from flask import abort, request
from sqlalchemy import select
from flask_jwt import jwt_required
from models import User
import global_func as global_f
from sqlalchemy.exc import IntegrityError
import hashlib

class UserRest(Resource):
    def __init__(self):
        super().__init__()
        try:
            self.session = global_f.connect_db()
            pass
        except Exception as error:
            abort(500, f"Error connect with DB")
    
    def get(self, id_user=None):
        condition = f"AND id = {id_user}" if id_user else ""
        
        users = self.session.execute(select(User).where(User.status == 1)).all()
        data = self._format_data_user(users)
        return data, 200

    def post(self):
        parser = reqparse.RequestParser()

        parser.add_argument('nombre', type=global_f.validatestr, required=True, help="Por favor ingrese un nombre valido")
        parser.add_argument('direccion', type=str, required=True, help="Por favor ingrese una direccion valida")
        parser.add_argument('telefono', type=int, required=True, help="Por favor ingrese un telefono valido")
        parser.add_argument('email', type=global_f.validate_email, required=True, help="Por favor ingrese un email valido")
        parser.add_argument('username', type=global_f.validatestr, required=True, help="Por favor ingrese un username valido")
        parser.add_argument('password', type=str, required=True, help="Por favor ingrese un password valido")

        args = parser.parse_args()

        password = hashlib.sha256(args['password'].encode()).hexdigest()

        try:
            new_user = User(
            nombre_completo = args["nombre"],
            direccion = args["direccion"],
            telefono = args['telefono'],
            email = args['email'],
            username = args['username'],
            password = password
            )
            self.session.add(new_user)
            self.session.flush()
            self.session.commit()
            return self._format_data_user([(new_user,)])
        except IntegrityError :
            return {"message" : "Ya existe un usuario con ese username"}, 400

    def _format_data_user(self, users):
        data = []
        for user in users:
            reg = {
                'id': user[0].id,
                'nombre': user[0].nombre_completo,
                'direccion': user[0].direccion,
                'telefono': user[0].telefono
            }
            data.append(reg)
        return data
