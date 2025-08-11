from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from backend.models.usuarios import Usuario
from backend.schemas.auth_schema import RegisterRequest, LoginRequest
from backend.services.auth_service import hash_password, verify_password, user_exists

router = APIRouter()

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    user = user_exists(db, data.email)
    if user:
        raise HTTPException(status_code=400, detail="El email ya está registrado")

    new_user = Usuario(
        nombre=data.nombre,
        correo=data.email,  # acorde a tu modelo Usuario que tiene campo correo
        contrasena_hash=hash_password(data.password)  # aquí también ajusta el campo
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Usuario registrado exitosamente"}


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    # Buscar por correo o nombre de usuario
    user = db.query(Usuario).filter(
        (Usuario.correo == data.emailOrUsername) | (Usuario.nombre == data.emailOrUsername)
    ).first()

    if not user or not verify_password(data.password, user.contrasena_hash):
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")

    # Crear token JWT
    token_data = {
        "sub": str(user.id),
        "exp": datetime.utcnow() + timedelta(hours=1)  # expira en 1 hora
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