from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class Historial(Base):
    __tablename__ = "historiales"
    id = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    id_curso = Column(Integer, ForeignKey("cursos.id"))
    fecha_inicio = Column(DateTime)
    fecha_fin = Column(DateTime)