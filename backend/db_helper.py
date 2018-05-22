from sqlalchemy import create_engine, Table, Column, Integer, String, Binary, MetaData
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from config import db_name
import base64

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
    image = Column(Binary)

    
    def __init__(self, author_id, title, description, body, image):
        self.author_id = author_id
        self.title = title
        self.description = description
        self.body = body
        self.image = image


    def to_json(self):
        return {
        'author_id': self.author_id,
        'title': self.title,
        'description': self.description,
        'body': self.body,
        'image': None if self.image == None else base64.b64encode(self.image).decode('utf-8')
        }
