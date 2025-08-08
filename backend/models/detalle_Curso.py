from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class DetalleCurso(Base):
    __tablename__ = "detalle_cursos"
    id = Column(Integer, primary_key=True)
    id_curso = Column(Integer, ForeignKey("cursos.id"))
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    titulo = Column(String(255))
    descripcion = Column(Text)
    objetivo = Column(String(255))
    habilidad_Id = Column(Integer, ForeignKey("habilidades.id"))
