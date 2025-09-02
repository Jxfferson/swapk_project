from backend.db import Base
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from datetime import datetime

class Publicacion(Base):
    __tablename__ = "publicaciones"

    id = Column(Integer, primary_key=True)
    titulo = Column(String(255), nullable=False)
    contenido = Column(Text, nullable=False)
    tipo = Column(Enum("Intercambio", "Curso", "Pregunta", "Logro"), nullable=False)
    imagen = Column(String(500), nullable=True)  # URL de la imagen
    fecha_creacion = Column(DateTime(timezone=True), default=datetime.utcnow)
    id_usuario = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    id_perfil = Column(Integer, ForeignKey("perfiles.id"))

    usuario = relationship("Usuario", back_populates="publicaciones")
    perfil = relationship("Perfil", back_populates="publicaciones")
    comentarios = relationship("Comentario", back_populates="publicacion")
    likes = relationship("Like", back_populates="publicacion")

    def __repr__(self):
        return f"<Publicacion(id={self.id}, titulo='{self.titulo}', usuario={self.id_usuario})>"