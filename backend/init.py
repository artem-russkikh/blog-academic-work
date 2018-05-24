from db_helper import Post, User, engine

Post.metadata.create_all(engine)
User.metadata.create_all(engine)
