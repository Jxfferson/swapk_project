from backend.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class DetalleIntercambio(Base):
    __tablename__ = "detalle_intercambios"
    id = Column(Integer, primary_key=True)
    id_intercambio = Column(Integer, ForeignKey("intercambios.id"))
    id_usuario_Solicitante = Column(Integer, ForeignKey("usuarios.id"))
    descripcion = Column(Text)
    id_habilidad_ofrecida = Column(Integer, ForeignKey("habilidades.id"))
    id_habilidad_solicitada = Column(Integer, ForeignKey("habilidades.id"))