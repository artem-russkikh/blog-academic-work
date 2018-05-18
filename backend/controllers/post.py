from flask_restful import request, Resource
from api_helper import Response, not_impemented

class Post(Resource):
    def get(self, post_id):
        return not_impemented

    def put(self, post_id):
        token = request.headers['Authorization']
        title = request.form['title']
        description = request.form['description']
        body = request.form['body']
        image = request.form['image']
        
        return not_impemented

    def delete(self, post_id):
        xtoken = request.headers['xtoken']
        
        return not_impemented