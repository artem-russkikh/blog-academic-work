from db_helper import Session, User

def try_get_user_id(user_token):
  session = Session()
  try:
    user = session.query(User).filter(User.token==user_token).scalar()
    if user == None:
      return False, 0
    else:
      return True, user.id
  except:
      return False, 0
  finally:
      session.close()
