from flask_restful import request, Resource
from flask import jsonify
from api_helper import Response, not_authorized
from models.post import get_post, update_post, delete_post
from models.authorization import try_get_user_id
from flask import abort, json
from config import image_format

class Post(Resource):
    def get(self, post_id):
        resp = get_post(post_id)
        if resp['error']['code'] == 404:
            abort(404)

        return jsonify(resp)

    def put(self, post_id):
        id_exist, _ = try_get_user_id(request.headers['Authorization'])

        if not id_exist:
            abort(401)
        
        if not 'post_data' in request.form:
            abort(204)

        data = json.loads(request.form['post_data'])

        title = data['title']
        description = data['description']
        body = data['body']

        resp = update_post(title, description, body, post_id)

        if resp['error']['code'] == 404:
            abort(404)
        
        if 'image' in request.files:
            f = request.files['image']
            f.save(image_format(post_id))

        return jsonify(resp)

    def delete(self, post_id):
        id_exist, _ = try_get_user_id(request.headers['Authorization'])
        
        if not id_exist:
            abort(401)
            
        resp = delete_post(post_id)

        if resp['error']['code'] == 404:
            abort(404)

        return jsonify(resp)