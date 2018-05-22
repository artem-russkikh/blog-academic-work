from api_helper import Response, internal_server_error, successful, not_found
from db_helper import Session, Post

def create_post(author_id, title, description, body, image):
    session = Session()
    try:
        post = Post(author_id, title, description, body, image)
        session.add(post)
        session.commit()
        return successful('post_id:{}'.format(post.id))
    except:
        session.rollback()
        return internal_server_error
    finally:
        session.close()


def get_post(post_id):
    session = Session()
    try:
        post = session.query(Post).get(post_id)
        return not_found if post == None else successful(post.to_json())
    except:
        session.rollback()
        return internal_server_error
    finally:
        session.close()


def update_post(title, description, body, image, post_id):
    session = Session()
    try:
        session.query(Post).filter(Post.id == post_id).update(
            {
            'title': title,
            'description': description,
            'body': body,
            'image': image
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
    pass