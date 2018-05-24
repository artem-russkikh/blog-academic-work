from api_helper import Response, internal_server_error, successful, not_found
from db_helper import Session, Post
from config import image_format, image_host, stub_image
from time import gmtime, strftime
import os

def create_post(author_id, title, description, body):
    session = Session()
    try:
        post = Post(author_id, title, description, body, strftime("%Y-%m-%dT%H:%M:%S", gmtime()))
        session.add(post)
        session.commit()
        return successful(post.id)
    except:
        session.rollback()
        return internal_server_error
    finally:
        session.close()


def get_post(post_id):
    session = Session()
    try:
        post = session.query(Post).get(post_id)
        if post == None:
            return not_found
        else:
            image_path = image_format(post.id)

            if os.path.isfile(image_path):
                image_path = image_host + '/' + image_path
            else:
                image_path = stub_image

            return successful({
            'author_id': post.author_id,
            'title': post.title,
            'description': post.description,
            'body': post.body,
            'created_at': post.created_at,
            'image': image_path
            })
    except:
        return internal_server_error
    finally:
        session.close()


def update_post(title, description, body, post_id):
    session = Session()
    try:
        session.query(Post).filter(Post.id == post_id).update(
            {
            'title': title,
            'description': description,
            'body': body
            }
        )

        session.commit()
        return successful('Post {} updated'.format(post_id))
    except:
        session.rollback()
        return internal_server_error
    finally:
        session.close()


def delete_post(post_id):
    session = Session()
    try:
        session.query(Post).filter(Post.id == post_id).delete()
        session.commit()

        image_path = image_format(post_id)

        if os.path.isfile(image_path):
            os.remove(image_path)

        return successful('Post {} deleted'.format(post_id))
    except:
        session.rollback()
        return internal_server_error
    finally:
        session.close()


def get_posts(limit, offset):
    session = Session()
    try:
        result = []
        for post in session.query(Post.id, Post.author_id, Post.title, Post.description, Post.created_at).limit(limit).offset(offset).all():
            image_path = image_format(post.id)

            if os.path.isfile(image_path):
                image_path = image_host + '/' + image_path
            else:
                image_path = stub_image

            result.append({
                'id': post.id,
                'author_id': post.author_id,
                'title': post.title,
                'description': post.description,
                'created_at': post.created_at,
                'image': image_path
                })

        return successful(result)
    except:
        return internal_server_error
    finally:
        session.close()
