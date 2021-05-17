import re
import base64
import io
from PIL import Image
from flask import current_app
from config import USERDB, PASSDB, HOSTDB, DBNAME
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

def connect_db():
    try:
        engine = create_engine(f"mysql+mysqldb://{USERDB}:{PASSDB}@{HOSTDB}/{DBNAME}")
        engine.connect()
        session = Session(engine)
        return session
    except Exception as error:
        raise Exception(error)

def validatestr(value):
    regex = re.compile('^[a-zA-Z0-9 ]*$')
    
    if value and bool(regex.match(value)):
        return value
    else:
        raise ValueError("string is empty")

def validate_email(value):
    regex = re.compile('^[a-zA-Z0-9]+@([a-zA-Z0-9]+\.)+[a-z]{2,3}$')
    
    if value and bool(regex.match(value)):
        return value
    else:
        raise ValueError("string is empty")

def base64_to_file(args):
    # file_image = f"imgnotice{args['identification']}"
    image_stream = io.BytesIO(base64.b64decode(args["imagen"]))
    image = Image.open(image_stream)
    file_format = image.format
    name_image = "asdasdasdasds"
    file_image = f"{name_image}.{file_format.lower()}"
    if file_format in ("JPEG", "PNG"):
        image.save(f"{current_app.config['IMAGE_FOLDER']}{file_image}", file_format)
        args["imagen"] = file_image
    else:
        raise Exception('This file is not image')

def format_url_image(data, url):
    for i in data:
        i['image'] = f"{url[0:-1]}{i['image']}" if i['image'] else None
    return data
        

