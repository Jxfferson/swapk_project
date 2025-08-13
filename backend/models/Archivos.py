from backend.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class Archivo(Base):
    __tablename__ = "archivos"
    id = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    nombre = Column(String(255))
    tipo = Column(String(255))
    Tamaño_bytes = Column(String(255))
    url = Column(String(255))
    fecha_subida = Column(DateTime)
    Id_Curso = Column(Integer, ForeignKey("cursos.id"))
    Id_Intercambio = Column(Integer, ForeignKey("intercambios.id"))
