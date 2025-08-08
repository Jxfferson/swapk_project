from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class EstadoInscripcion(str, enum.Enum):
    Pendiente = "Pendiente"
    Confirmado = "Confirmado"
    Finalizado = "Finalizado"

class InscripcionCurso(Base):
    __tablename__ = "inscripciones_curso"
    id = Column(Integer, primary_key=True)
    id_curso = Column(Integer, ForeignKey("cursos.id"))
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    fecha_Inscripcion = Column(DateTime)
    estado = Column(Enum(EstadoInscripcion))