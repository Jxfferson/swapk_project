from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Float

class Resena(Base):
    __tablename__ = "resenas"
    id = Column(Integer, primary_key=True)
    id_Autor = Column(Integer, ForeignKey("usuarios.id"))
    id_Receptor = Column(Integer, ForeignKey("usuarios.id"))
    calificacion = Column(Float)
    comentario = Column(Text)
    fecha = Column(DateTime)