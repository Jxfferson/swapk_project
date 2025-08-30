from backend.db import Base
from sqlalchemy import Column, Integer, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

class Comentario(Base):
    __tablename__ = "comentarios"

    id = Column(Integer, primary_key=True)
    contenido = Column(Text, nullable=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relación con el usuario
    id_usuario = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    usuario = relationship("Usuario", back_populates="comentarios")  # ✅ Cambiado de backref a back_populates

    # Relación con la publicación
    id_publicacion = Column(Integer, ForeignKey("publicaciones.id"), nullable=False)
    publicacion = relationship("Publicacion", back_populates="comentarios")

    # Relación con comentario padre (respuestas)
    id_comentario_padre = Column(Integer, ForeignKey("comentarios.id"), nullable=True)
    
    # respuestas a este comentario
    respuestas = relationship( "Comentario", back_populates="comentario_padre", cascade="all, delete-orphan", lazy="select"
    )

    # Padre: comentario original 
    comentario_padre = relationship( "Comentario", back_populates="respuestas", remote_side=[id], lazy="select" )

    def __repr__(self):
        return f"<Comentario(id={self.id}, usuario={self.id_usuario}, publicacion={self.id_publicacion})>"