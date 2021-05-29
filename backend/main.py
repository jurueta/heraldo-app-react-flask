import os
from flask import Flask, send_from_directory
from flask_restful import Api
from flask_jwt import JWT, jwt_required, current_identity
from resource.user import UserRest
from resource.notice import NoticeRest
from resource.category import CategoryRest
from flask_cors import CORS
import resource.auth as auth
from datetime import timedelta
import sys

app = Flask(__name__)
api = Api(app)

app.config["SECRET_KEY"] = "JAUSSLUWLSJOJSOWELJSAJOIJSOJ"
app.config["JWT_AUTH_URL_RULE"] = "/api/v1/auth"
app.config["JWT_EXPIRATION_DELTA"] = timedelta(days=2)

jwt = JWT(app, auth.authenticate, auth.indentity)


CORS(app, resources={r"/api/*": {"origins": "*"}})

PROJECT_HOME = os.path.dirname(os.path.realpath(__file__))

app.config['ROOT_FOLDER'] = PROJECT_HOME
app.config["UPLOAD_FOLDER"] = f"{PROJECT_HOME}/upload/"
app.config['IMAGE_FOLDER'] = f"{PROJECT_HOME}/img/"

api.add_resource(UserRest, "/api/v1/user", "/api/v1/user/<int:id_user>")
api.add_resource(NoticeRest, "/api/v1/notice", "/api/v1/notice/<int:id_notice>")
api.add_resource(CategoryRest, "/api/v1/category", "/api/v1/category/<int:id_category>")

@app.route('/')
def index():
    return 'hola mundo'

@app.route('/img/<string:img_name>')
def getImage(img_name):
    return send_from_directory(f"{app.config['IMAGE_FOLDER']}", img_name) 

if __name__ == '__main__':
    # app.run(host='25.1.114.174',port=80, debug=True)
    app.run(debug=True)
