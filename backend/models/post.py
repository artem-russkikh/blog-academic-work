from api_helper import Response, internal_server_error, successful, not_found
from db_helper import Session, Post
from config import image_format, image_host

def create_post(author_id, title, description, body):
    session = Session()
    try:
        post = Post(author_id, title, description, body)
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
            return successful({
            'author_id': post.author_id,
            'title': post.title,
            'description': post.description,
            'body': post.body,
            'image': image_host + '/' + image_format(post.id)
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
        for post in session.query(Post.id, Post.author_id, Post.title, Post.description).limit(limit).offset(offset).all():
            result.append({
                'post_id': post.id,
                'author_id': post.author_id,
                'title': post.title,
                'description': post.description,
                'image': image_host + '/' + image_format(post.id)
                })
        
        return successful(result)
    except:
        return internal_server_error
    finally:
        session.close()
