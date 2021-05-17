from flask_restful import Resource, reqparse, inputs
from flask import abort, request
from sqlalchemy import select
from flask_jwt import jwt_required
from models import Category
import global_func as global_f
from sqlalchemy.exc import IntegrityError
import hashlib

class CategoryRest(Resource):
    def __init__(self):
        super().__init__()
        try:
            self.session = global_f.connect_db()
            pass
        except Exception as error:
            abort(500, f"Error connect with DB")
    
    def get(self, id_category=None):
        categories = self.session.execute(select(Category).where(Category.status == 1)).all()
        data = self._format_data_user(categories)
        return data, 200

    def _format_data_category(self, cotegories):
        data = []
        for category in cotegories:
            reg = {
                'id': category[0].id,
                'nombre': category[0].nombre,
            }
            data.append(reg)
        return data
