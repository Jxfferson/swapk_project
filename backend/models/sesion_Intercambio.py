from backend.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class Modalidad(str, enum.Enum):
    Virtual = "Virtual"
    Presencial = "Presencial"
    Hibrido = "Hibrido"

class Sesion_Intercambio(Base):
    __tablename__ = "sesiones_Intercambio"
    id = Column(Integer, primary_key=True)
    id_intercambio = Column(Integer, ForeignKey("intercambios.id"))
    fecha_hora = Column(DateTime)
    modalidad = Column(Enum(Modalidad))