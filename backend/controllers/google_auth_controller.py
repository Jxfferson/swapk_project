from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests
from backend.db.database import get_db
from backend.models.usuarios import Usuario, RolUsuario
from backend.schemas.google_auth_schema import TokenSchema

router = APIRouter()

CLIENT_ID = "315082668508-pbvop5628cd5bsna1cbk7e4quhvhjs31.apps.googleusercontent.com"

@router.post("/login")
def google_login(data: TokenSchema, db: Session = Depends(get_db)):
    token = data.token
    try:
        # Verificar el token de Google
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        email = idinfo["email"]
        nombre = idinfo.get("name", "Usuario Google")

        usuario = db.query(Usuario).filter(Usuario.correo == email).first()

        if not usuario:
            usuario = Usuario(
                nombre=nombre,
                correo=email,
                contrasena_hash="",
                rol=RolUsuario.Usuario
            )
            db.add(usuario)
            db.commit()
            db.refresh(usuario)

        return {"id": usuario.id, "correo": usuario.correo, "nombre": usuario.nombre, "rol": usuario.rol}

    except Exception as e:
        raise HTTPException(status_code=400, detail="Token inválido o expirado")