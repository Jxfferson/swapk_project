import os

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey") 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 1