from sqlalchemy import create_engine, Table, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from config import db_name, image_format, image_host

engine = create_engine('sqlite:///' + db_name, echo=False)
Session = sessionmaker(bind=engine)

class Post(declarative_base()):
    __tablename__ = 'posts'
    __table_args__ = {'sqlite_autoincrement': True}
    id = Column(Integer, primary_key=True)
    author_id = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String)
    body = Column(String)
    

    def __init__(self, author_id, title, description, body):
        self.author_id = author_id
        self.title = title
        self.description = description
        self.body = body


    def to_json(self):
        return {
        'author_id': self.author_id,
        'title': self.title,
        'description': self.description,
        'body': self.body,
        'image': image_host + '/' + image_format(self.id)
        }
