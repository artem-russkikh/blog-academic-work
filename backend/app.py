from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

def Response(result, error):
    return { 'result': result, 'error': error }

class SignIn(Resource):
    def post(self):
        email = request.form['email']
        password = request.form['password']
        return Response(None, '{"Not implemented"}')


class SignUp(Resource):
    def post(self):
        email = request.form['email']
        password = request.form['password']
        password2 = request.form['password2']
        return Response(None, '{"Not implemented"}')


class Posts(Resource):
    def get(self):
        limit = request.form['limit']
        offset = request.form['offset']

        return Response(None, '{"Not implemented"}')
    
    def post(self):
        xtoken = request.headers['xtoken']

        title = request.form['title']
        description = request.form['description']
        body = request.form['body']
        image = request.form['image']
        
        return Response(None, "{'Not implemented'}")


class Post(Resource):
    def get(self, post_id):
        return Response(None, '{"Not implemented"}')

    def put(self, post_id):
        xtoken = request.headers['xtoken']

        title = request.form['title']
        description = request.form['description']
        body = request.form['body']
        image = request.form['image']
        
        return Response(None, '{"Not implemented"}')

    def delete(self, post_id):
        xtoken = request.headers['xtoken']
        
        return Response(None, '{"Not implemented"}')


api.add_resource(SignIn, '/signin.json')
api.add_resource(SignUp, '/signup.json')
api.add_resource(Posts, '/posts.json')
api.add_resource(Post, '/posts/<int:post_id>.json')

if __name__ == '__main__':
    app.run(debug=True)