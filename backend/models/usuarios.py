from backend.db import Base
from sqlalchemy import Column, Integer, String, Enum, DateTime
from sqlalchemy.sql import func
import enum

class RolUsuario(str, enum.Enum):
    Administrador = "Administrador"
    Moderador = "Moderador"
    Usuario = "Usuario"
    Verificado = "Verificado"

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True)
    nombre = Column(String(255))
    correo = Column(String(255))
    contrasena_hash = Column(String(255))  # sin ñ ni acento
    rol = Column(Enum(RolUsuario), default=RolUsuario.Usuario)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
