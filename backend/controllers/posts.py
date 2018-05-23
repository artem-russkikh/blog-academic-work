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

        return jsonify(get_posts(limit, offset))
    
    def post(self):
        token = request.headers['Authorization']
        
        if not 'post_data' in request.form:
            abort(204)

        f = None
        if 'image' in request.files:
            f = request.files['image']

        data = json.loads(request.form['post_data'])

        title = data['title']
        description = data['description']
        body = data['body']

        id_exist, user_id = try_get_user_id(token)

        if not id_exist:
            return not_authorized

        post = create_post(user_id, title, description, body)
        
        if f != None:
            f.save(image_format(post['result']))

        return jsonify(post)
