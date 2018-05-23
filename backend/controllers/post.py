from flask_restful import request, Resource
from flask import jsonify
from api_helper import Response, not_authorized
from models.post import get_post, update_post, delete_post
from models.authorization import try_get_user_id
from flask import abort

class Post(Resource):
    def get(self, post_id):
        post = get_post(post_id)
        if post['error']['code'] == 404:
            abort(404)

        return jsonify(post)

    def put(self, post_id):
        token = request.headers['Authorization']
        title = request.form['title']
        description = request.form['description']
        body = request.form['body']
        image = request.form['image']
        
        id_exist, _ = try_get_user_id(token)
        
        if not id_exist:
            return not_authorized

        return jsonify(update_post(title, description, body, image, post_id))

    def delete(self, post_id):
        token = request.headers['Authorization']
        
        id_exist, _ = try_get_user_id(token)
        
        if not id_exist:
            return not_authorized

        return jsonify(delete_post(post_id))