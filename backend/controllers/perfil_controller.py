from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.models.perfil import Perfil
from backend.services.oauth2 import get_current_user
from backend.models.usuarios import Usuario

router = APIRouter(prefix="/perfil", tags=["Perfil"])

@router.get("/{id}")
def get_perfil(id: int, db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)):
    # Verificar que el perfil pertenece al usuario autenticado
    if current_user.id != id:
        raise HTTPException(status_code=403, detail="Acceso denegado")

    perfil = db.query(Perfil).filter(Perfil.id_usuario == id).first()
    usuario = db.query(Usuario).filter(Usuario.id == id).first()

    print(f"📄 Perfil encontrado: {perfil}")
    print(f"📧 Usuario encontrado: {usuario}")

    if not perfil or not usuario:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")

    return {
        "id": perfil.id,
        "id_usuario": perfil.id_usuario,
        "nombre": perfil.nombre,
        "descripcion": perfil.descripcion,
        "ubicacion": perfil.ubicacion,
        "foto_perfil": perfil.foto_perfil,
        "correo": usuario.correo,
        "nombre_usuario": usuario.nombre
    }