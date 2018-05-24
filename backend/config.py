db_name = "db.sqlite"

image_host = 'http://127.0.0.1:5000'

stub_image = 'http://127.0.0.1:5000/images/default.jpg'

def image_format(post_id):
    return 'images/{}.jpg'.format(post_id)
