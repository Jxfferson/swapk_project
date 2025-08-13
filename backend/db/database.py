from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


#Cadena de conexion
#MARIADB_URL='mysql+pymysql://root:admin@localhost:3315/Swapk'
MARIADB_URL = 'mysql+pymysql://root:@localhost:3306/swapk'
#Crear el objeto de conexion
engine = create_engine(MARIADB_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

