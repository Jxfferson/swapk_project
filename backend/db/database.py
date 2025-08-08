from sqlalchemy import create_engine


#Cadena de conexion
#MARIADB_URL='mysql+pymysql://root:admin@localhost:3315/Swapk'
MARIADB_URL = 'mysql+pymysql://root:@localhost:3306/swapk'
#Crear el objeto de conexion
engine = create_engine(MARIADB_URL)


