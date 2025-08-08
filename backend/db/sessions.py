from sqlalchemy.orm import sessionmaker
from db import engine

Sessionlocal = sessionmaker(autocommit= False,
                            autoflush= False,
                            bind= engine)