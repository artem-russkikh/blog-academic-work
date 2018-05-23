db_name = "db.sqlite"

image_host = 'http://127.0.0.1:5000'

def image_format(post_id):
    return 'images/{}.jpg'.format(post_id)
