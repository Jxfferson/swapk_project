from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.db.database import get_db
from backend.models import Usuario, Publicacion, Comentario, Like
from backend.services.oauth2 import get_current_user  # Asumiendo que tienes sistema de auth
from pydantic import BaseModel
from backend.schemas.publicaciones_schemas import ComentarioCreate, PublicacionCreate


router = APIRouter(prefix="/api/publicaciones", tags=["Publicaciones"])


@router.post("/")
def crear_publicacion(
    pub_data: PublicacionCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    nueva_publicacion = Publicacion(
        titulo=pub_data.titulo,
        contenido=pub_data.contenido,
        tipo=pub_data.tipo,
        id_usuario=current_user.id,
        id_perfil=current_user.perfil.id if current_user.perfil else None
    )

    db.add(nueva_publicacion)
    db.commit()
    db.refresh(nueva_publicacion)

    return {
        "id": nueva_publicacion.id,
        "titulo": nueva_publicacion.titulo,
        "contenido": nueva_publicacion.contenido,
        "tipo": nueva_publicacion.tipo,
        "fecha_creacion": nueva_publicacion.fecha_creacion.isoformat(),
        "usuario": {
            "nombre": current_user.nombre,
            "foto_perfil": current_user.perfil.foto_perfil if current_user.perfil else "/img/default.png"
        },
        "likes": [],
        "comentarios": []
    }

@router.get("/publicaciones/{id_publicacion}/comentarios")
def get_comentarios(id_publicacion: int, db: Session = Depends(get_db)):
    comentarios = db.query(Comentario).filter(
        Comentario.id_publicacion == id_publicacion,
        Comentario.id_comentario_padre == None  # Solo comentarios principales
    ).all()

    # Agregar respuestas si las hay
    resultado = []
    for c in comentarios:
        respuesta = {
            "id": c.id,
            "contenido": c.contenido,
            "nombre_usuario": c.usuario.nombre,
            "foto_perfil": c.usuario.perfil.foto_perfil if c.usuario.perfil else "/img/default.png",
            "fecha": c.fecha_creacion.isoformat(),
            "respuestas": [
                {
                    "id": r.id,
                    "contenido": r.contenido,
                    "nombre_usuario": r.usuario.nombre,
                    "foto_perfil": r.usuario.perfil.foto_perfil if r.usuario.perfil else "/img/default.png",
                    "fecha": r.fecha_creacion.isoformat(),
                }
                for r in c.respuestas
            ]
        }
        resultado.append(respuesta)

    return resultado


@router.post("/comentarios")
def crear_comentario(
    comentario_data: ComentarioCreate,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    # Verificar que la publicación exista
    publicacion = db.query(Publicacion).filter(Publicacion.id == comentario_data.id_publicacion).first()
    if not publicacion:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")

    nuevo_comentario = Comentario(
        contenido=comentario_data.contenido,
        id_usuario=current_user.id,
        id_publicacion=comentario_data.id_publicacion,
        id_comentario_padre=comentario_data.id_comentario_padre
    )

    db.add(nuevo_comentario)
    db.commit()
    db.refresh(nuevo_comentario)

    return {
        "id": nuevo_comentario.id,
        "contenido": nuevo_comentario.contenido,
        "nombre_usuario": current_user.nombre,
        "foto_perfil": current_user.perfil.foto_perfil if current_user.perfil else "/img/default.png",
        "fecha": nuevo_comentario.fecha_creacion.isoformat(),
        "respuestas": []
    }


@router.post("/publicaciones/{id_publicacion}/like")
def toggle_like(
    id_publicacion: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    publicacion = db.query(Publicacion).filter(Publicacion.id == id_publicacion).first()
    if not publicacion:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")

    # Buscar si ya existe el like
    like_existente = db.query(Like).filter(
        Like.id_usuario == current_user.id,
        Like.id_publicacion == id_publicacion
    ).first()

    if like_existente:
        # Quitar like
        db.delete(like_existente)
        db.commit()
        return {"liked": False, "total_likes": len(publicacion.likes) - 1}
    else:
        # Añadir like
        nuevo_like = Like(id_usuario=current_user.id, id_publicacion=id_publicacion)
        db.add(nuevo_like)
        db.commit()
        return {"liked": True, "total_likes": len(publicacion.likes) + 1}