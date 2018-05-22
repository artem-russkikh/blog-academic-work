from db_helper import Post, engine

Post.metadata.create_all(engine)
