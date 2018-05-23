from flask_restful import Api
from controllers.post import Post
from controllers.posts import Posts
from controllers.signin import SignIn
from controllers.signup import SignUp
from controllers.image import Image

class Router:
    def __init__(self, app):
        api = Api(app)
        api.add_resource(SignIn, '/signin.json')
        api.add_resource(SignUp, '/signup.json')
        api.add_resource(Posts, '/posts.json')
        api.add_resource(Post, '/posts/<int:post_id>.json')
        api.add_resource(Image, '/images/<int:image_id>.jpg')