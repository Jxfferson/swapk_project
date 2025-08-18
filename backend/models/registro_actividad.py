from backend.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Enum
import enum

class TipoActividad(str, enum.Enum):
    Actualizar_Perfil = "Actualizar Perfil"
    Enviar_Mensaje = "Enviar Mensaje"
    Crear_Intercambio = "Crear Intercambio"
    Calificar_Intercambio = "Calificar Intercambio"
    Crear_Curso = "Crear Curso"
    Agendar_Sesion = "Agendar_Sesion"
    Reporte_Usuario = "Reporte Usuario"

class RegistroActividad(Base):
        __tablename__ = 'registro_actividad'
        id = Column(Integer, primary_key=True)
        usuario_id = Column(Integer, ForeignKey('usuarios.id'))
        Tipo = Column(Enum(TipoActividad))
        Descripcion = Column(String(255))
        fecha_hora = Column(DateTime)