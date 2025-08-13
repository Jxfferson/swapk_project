from backend.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum


class NivelHabilidad(str, enum.Enum):
    Principiante = "Principiante"
    Intermedio = "Intermedio"
    Experto = "Experto"

class HabilidadUsuario(Base):
    __tablename__ = "habilidades_usuario"
    id = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    id_habilidad = Column(Integer, ForeignKey("habilidades.id"))
    nivel = Column(Enum(NivelHabilidad))