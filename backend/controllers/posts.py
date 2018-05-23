from flask_restful import request, Resource
from flask import jsonify, json
from api_helper import Response, not_authorized
from models.post import create_post, get_posts
from models.authorization import try_get_user_id
from flask import abort
from config import image_format

class Posts(Resource):
    def get(self):
        limit = request.form['limit']
        offset = request.form['offset']

        resp = get_posts(limit, offset)

        if resp['error']['code'] == 404:
            abort(404)

        return jsonify(resp)
    
    def post(self):
        id_exist, user_id = try_get_user_id(request.headers['Authorization'])

        if not id_exist:
            abort(401)
        
        if not 'post_data' in request.form:
            abort(204)

        data = json.loads(request.form['post_data'])

        title = data['title']
        description = data['description']
        body = data['body']

        resp = create_post(user_id, title, description, body)

        if resp['error']['code'] == 404:
            abort(404)
        
        if 'image' in request.files:
            f = request.files['image']
            f.save(image_format(resp['result']))

        return jsonify(resp)
