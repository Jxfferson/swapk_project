from backend.db import Base
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum, UniqueConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

class Like(Base):
    __tablename__ = "likes"

    id = Column(Integer, primary_key=True)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relación: un usuario puede dar like a una publicación
    id_usuario = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    id_publicacion = Column(Integer, ForeignKey("publicaciones.id"), nullable=False)

    # Evitar duplicados
    __table_args__ = (UniqueConstraint('id_usuario', 'id_publicacion', name='_usuario_publicacion_uc'),)

    # Relaciones
    usuario = relationship("Usuario", back_populates="likes")  # ✅ Cambiado: backref → back_populates
    publicacion = relationship("Publicacion", back_populates="likes")

    def __repr__(self):
        return f"<Like(usuario={self.id_usuario}, publicacion={self.id_publicacion})>"