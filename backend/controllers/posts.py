from flask_restful import request, Resource
from flask import jsonify
from api_helper import Response, not_authorized
from models.post import create_post, get_posts
from models.authorization import try_get_user_id

class Posts(Resource):
    def get(self):
        limit = request.form['limit']
        offset = request.form['offset']

        return jsonify(get_posts(limit, offset))
    
    def post(self):
        token = request.headers['Authorization']

        title = request.form['title']
        description = request.form['description']
        body = request.form['body']
        image = request.form['image']

        id_exist, user_id = try_get_user_id(token)

        if not id_exist:
            return not_authorized

        return jsonify(create_post(user_id, title, description, body, image))