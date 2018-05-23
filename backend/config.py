db_name = "db.sqlite"

image_host = 'http://127.0.0.1:5000'

stub_image = 'http://twist.elearningguild.net/wp-content/uploads/2014/02/Blog-graphic-from-Istock.jpg'

def image_format(post_id):
    return 'images/{}.jpg'.format(post_id)
