from backend.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class EstadoIntercambio(str, enum.Enum):
    Pendiente = "Pendiente"
    Confirmado = "Confirmado"
    Finalizado = "Finalizado"

class Intercambio(Base):
    __tablename__ = "intercambios"
    id = Column(Integer, primary_key=True)
    id_usuario_oferta = Column(Integer, ForeignKey("usuarios.id"))
    id_usuario_solicita = Column(Integer, ForeignKey("usuarios.id"))
    id_habilidad_oferta = Column(Integer, ForeignKey("habilidades.id"))
    id_habilidad_solicita = Column(Integer, ForeignKey("habilidades.id"))
    estado = Column(Enum(EstadoIntercambio))
    fecha_inicio = Column(DateTime)
    fecha_fin = Column(DateTime)