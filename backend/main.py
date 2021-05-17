import os
from flask import Flask
from flask_restful import Api
from resource.user import UserRest
from resource.notice import NoticeRest
from resource.category import CategoryRest

app = Flask(__name__)
api = Api(app)

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

if __name__ == '__main__':
    app.run(port=80, debug=True)
