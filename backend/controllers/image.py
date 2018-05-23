from flask_restful import request, Resource
from flask import send_from_directory, abort, render_template
from config import image_format
import os.path

class Image(Resource):
    def get(self, image_id):
        if not os.path.isfile(image_format(image_id)):
            return abort(404)

        return send_from_directory('images', '{}.jpg'.format(image_id))