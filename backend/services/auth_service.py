from db.database import SessionLocal
from backend.models.usuarios import Usuario
from fastapi import HTTPException
from passlib.hash import bcrypt
from backend.schemas.auth_schema import RegisterRequest, LoginRequest

def hash_password(password: str) -> str:
    return bcrypt.hash(password)

def verify_password(plain_password: str, contraseña_hash: str) -> bool:
    return bcrypt.verify(plain_password, contraseña_hash)


def user_exists(db, email: str) -> bool:
    db = SessionLocal()
    user = db.query(Usuario).filter(Usuario.correo == email).first()
    db.close()
    return user is not None

def register_user(data: RegisterRequest):
    db = SessionLocal()
    try:
        if user_exists(db, data.email):
            raise HTTPException(status_code=400, detail="Email ya registrado")

        contraseña_hash = hash_password(data.password)
        new_user = Usuario(
            nombre=data.nombre,
            correo=data.email,
            contrasena_hash=contraseña_hash
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"message": "Usuario registrado con éxito"}
    finally:
        db.close()

def login_user(data: LoginRequest):
    db = SessionLocal()
    try:
        user = db.query(Usuario).filter(Usuario.correo == data.email).first()
        if not user or not verify_password(data.password, user.contrasena_hash):
            raise HTTPException(status_code=401, detail="Credenciales inválidas")
        return {"message": "Login exitoso"}
    finally:
        db.close()