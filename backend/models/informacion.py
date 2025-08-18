from backend.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class Informacion(Base):
    __tablename__ = "informaciones"
    id = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    id_curso = Column(Integer, ForeignKey("cursos.id"))
    contenido = Column(Text)