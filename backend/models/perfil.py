from backend.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class Perfil(Base):
    __tablename__ = "perfiles"
    id = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    nombre = Column(String(255))
    descripcion = Column(Text)
    ubicacion = Column(String(255))
    foto_perfil = Column(String(255))
    informacion_Id = Column(Integer, ForeignKey("informaciones.id"))
    historial_Id = Column(Integer, ForeignKey("historiales.id"))
    habilidad_Id = Column(Integer, ForeignKey("habilidades.id"))
    detalle_Intercambio = Column(Integer, ForeignKey("detalle_intercambios.id"))
    detalle_Curso = Column(Integer, ForeignKey("detalle_cursos.id"))
