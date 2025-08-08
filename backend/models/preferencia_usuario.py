from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class Modalidad(str, enum.Enum):
    Virtual = "Virtual"
    Presencial = "Presencial"
    Hibrido = "Hibrido"

class PreferenciaUsuario(Base):
    __tablename__ = "preferencia_usuario"
    id = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    modalidad = Column(Enum(Modalidad))
    idiomas = Column(String(255))
    intereses = Column(String(255))
    nivel = Column(String(255))