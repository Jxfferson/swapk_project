
from backend.db import Base
from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

class RolUsuario(str, enum.Enum):
    Administrador = "Administrador"
    Moderador = "Moderador"
    Usuario = "Usuario"
    Verificado = "Verificado"


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True)
    nombre = Column(String(255), nullable=False)
    correo = Column(String(255), unique=True, nullable=False)
    contrasena_hash = Column(String(255), nullable=False)
    rol = Column(Enum(RolUsuario), default=RolUsuario.Usuario)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())

    # Relaciones
    publicaciones = relationship("Publicacion", back_populates="usuario")
    comentarios = relationship("Comentario", back_populates="usuario")
    likes = relationship("Like", back_populates="usuario")
    perfil = relationship("Perfil", back_populates="usuario", uselist=False)


    def __repr__(self):
        return f"<Usuario(id={self.id}, nombre='{self.nombre}', correo='{self.correo}', rol='{self.rol}')>"