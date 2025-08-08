from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class TipoSugerencia(str, enum.Enum):
    Nueva_Categoria = "Nueva_Categoria"
    Mejora_UIUX = "Mejora_UIUX"
    Mejora_Funcionalidad = "Mejora_Funcionalidad"
    Sugerencia_General = "Sugerencia_General"
    Peticion_Caracteristica = "Peticion_Caracteristica"

class Sugerencia(Base):
    __tablename__ = "sugerencias"
    id = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    tipo = Column(Enum(TipoSugerencia))
    Mensaje = Column(String(255))
    fecha = Column(DateTime)