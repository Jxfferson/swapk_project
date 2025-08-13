from backend.db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Float

class EstadisticaUsuario(Base):
    __tablename__ = "estadisticas_usuario"
    id = Column(Integer, primary_key=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    cursos_completados = Column(Integer)
    intercambios_Realizados = Column(Integer)
    calificacion_promedio = Column(Float)
    reseñas_totales = Column(Integer)