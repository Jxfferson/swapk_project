from pathlib import Path
import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy.orm import Session
from sqlalchemy import or_
from datetime import datetime, timedelta
from jose import JWTError, jwt
from backend.db.database import get_db
from backend.models.usuarios import Usuario
from backend.models.perfil import Perfil
from backend.schemas.auth_schema import RegisterRequest, LoginRequest
from backend.services.auth_service import hash_password, verify_password, user_exists
from backend.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_HOURS

router = APIRouter()
security = HTTPBasic()

def authenticate_user(credentials: HTTPBasicCredentials, db: Session):
    user = db.query(Usuario).filter(Usuario.correo == credentials.username).first()
    if user and verify_password(credentials.password, user.contrasena_hash):
        return user
    return None

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    # Verificar si ya existe
    user = user_exists(db, data.email)
    if user:
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    # Crear nuevo usuario
    new_user = Usuario(
        nombre=data.nombre,
        correo=data.email,
        contrasena_hash=hash_password(data.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Crear perfil asociado automáticamente con id_usuario y nombre
    new_profile = Perfil(
        id_usuario=new_user.id,
        nombre=new_user.nombre
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    # Crear token JWT igual que en login
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    token_data = {
        "sub": str(new_user.id),
        "exp": expire
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "message": "Usuario y perfil creados exitosamente",
        "token": token,
        "user": {  # ✅ Ahora en inglés, como en /login
            "id": new_user.id,
            "nombre": new_user.nombre,
            "correo": new_user.correo
        },
        "perfil": {
            "id": new_profile.id,
            "id_usuario": new_profile.id_usuario,
            "nombre": new_profile.nombre
        }
    }

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    # Buscar por correo o nombre de usuario
    user = db.query(Usuario).filter(
    or_(Usuario.correo == data.emailOrUsername, Usuario.nombre == data.emailOrUsername)
    ).first()

    if not user or not verify_password(data.password, user.contrasena_hash):
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")

    # Crear token JWT
    expire = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    token_data = {
        "sub": str(user.id),
        "exp": expire
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "message": "Login exitoso",
        "token": token,
        "user": {
            "id": user.id,
            "nombre": user.nombre,
            "correo": user.correo
        }
    }
