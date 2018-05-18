from flask_restful import request, Resource
from api_helper import Response, not_impemented

class Posts(Resource):
    def get(self):
        limit = request.form['limit']
        offset = request.form['offset']

        return not_impemented
    
    def post(self):
        token = request.headers['Authorization']

        title = request.form['title']
        description = request.form['description']
        body = request.form['body']
        image = request.form['image']
        
        return not_impemented