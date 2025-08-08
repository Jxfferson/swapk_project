from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
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
    contrasena_hash = Column(String(255))
    rol = Column(Enum(RolUsuario))
    fecha_creacion = Column(DateTime)