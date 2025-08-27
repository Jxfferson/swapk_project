from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.models.perfil import Perfil
from backend.services.oauth2 import get_current_user
from backend.models.usuarios import Usuario
from backend.services.auth_service import hash_password  # Asumimos que ya existe

router = APIRouter(prefix="/perfil", tags=["Perfil"])

# ------------------- GET /perfil/{id} -------------------
@router.get("/{id}")
def get_perfil(id: int, db: Session = Depends(get_db), current_user: Usuario = Depends(get_current_user)):
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

# ------------------- PUT /perfil/{id} -------------------
@router.put("/{id}")
def update_perfil(
    id: int,
    data: dict = Body(...),  # Puedes usar un esquema más adelante
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    # ✅ Verificar que el usuario autenticado es el dueño del perfil
    if current_user.id != id:
        raise HTTPException(status_code=403, detail="Acceso denegado")

    perfil = db.query(Perfil).filter(Perfil.id_usuario == id).first()
    usuario = db.query(Usuario).filter(Usuario.id == id).first()

    if not perfil or not usuario:
        raise HTTPException(status_code=404, detail="Perfil no encontrado")

    # ✅ Actualizar nombre (si viene)
    if "nombre" in data:
        nuevo_nombre = data["nombre"].strip()
        if not nuevo_nombre:
            raise HTTPException(status_code=400, detail="El nombre no puede estar vacío")
        perfil.nombre = nuevo_nombre
        usuario.nombre = nuevo_nombre  # Mantener consistencia

    # ✅ Actualizar descripción (opcional)
    if "descripcion" in data:
        perfil.descripcion = data["descripcion"]

    # ✅ Actualizar ubicación (opcional)
    if "ubicacion" in data:
        perfil.ubicacion = data["ubicacion"]

    # ✅ Actualizar contraseña (opcional)
    if "contrasena" in data:
        contrasena = data["contrasena"]
        if len(contrasena) < 6:
            raise HTTPException(status_code=400, detail="La contraseña debe tener al menos 6 caracteres")
        usuario.contrasena_hash = hash_password(contrasena)

    # ✅ Guardar cambios
    try:
        db.commit()
        db.refresh(perfil)
        db.refresh(usuario)
        return {"msg": "Perfil actualizado correctamente"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error al guardar en la base de datos")