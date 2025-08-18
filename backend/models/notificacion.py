from backend.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class TipoNotificacion(str, enum.Enum):
    Recordatorio_Aceptado = "Recordatorio Aceptado"
    Recordatorio_Cancelado = "Recordatorio Cancelado"
    Curso_Aceptado = "Curso Aceptado"
    Curso_Cancelado = "ResuelCurso_Canceladoto"
    Recordatorio_Trueque = "Recordatorio Trueque"
    Recordatorio_Curso = "Recordatorio Curso"
    Mensaje = "Mensaje"
    Personalizada = "Personalizada"

class Notificacion(Base):
    __tablename__ = "notificaciones"
    id = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    contenido = Column(Text)
    tipo = Column(Enum(TipoNotificacion))
    fecha = Column(DateTime)
    leido = Column(Boolean, default=False)