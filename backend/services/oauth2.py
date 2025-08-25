from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.models.usuarios import Usuario  
from backend.config import SECRET_KEY, ALGORITHM 


# URL donde se obtiene el token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_user(
    token: str = Depends(oauth2_scheme), 
    db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No se pudo validar las credenciales",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        print("🔍 Token recibido:", token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("✅ Payload decodificado:", payload)
        user_id: str = payload.get("sub")
        if user_id is None:
            print("❌ No se encontró 'sub' en el token")
            raise credentials_exception
    except JWTError as e:
        print("❌ Error JWT:", str(e))
        raise credentials_exception

    user = db.query(Usuario).filter(Usuario.id == int(user_id)).first() 
    if user is None:
        print("❌ Usuario no encontrado en DB:", user_id)
        raise credentials_exception
    return user