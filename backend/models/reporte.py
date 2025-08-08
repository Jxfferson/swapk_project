from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class EstadoReporte(str, enum.Enum):
    Enviado = "Enviado"
    Revisado = "Revisado"
    Rechazado = "Rechazado"
    Resuelto = "Resuelto"
    Cerrado = "Cerrado"

class Reporte(Base):
    __tablename__ = "reportes"
    id = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    tipo = Column(String(255))
    estado = Column(Enum(EstadoReporte))
    fecha_reporte = Column(DateTime)
    motivo = Column(Text)