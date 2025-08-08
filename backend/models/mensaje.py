from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean

class Mensaje(Base):
    __tablename__ = "mensajes"
    id = Column(Integer, primary_key=True)
    id_Emisor = Column(Integer, ForeignKey("usuarios.id"))
    id_Receptor = Column(Integer, ForeignKey("usuarios.id"))
    contenido = Column(Text)
    fecha_envio = Column(DateTime)
    leido = Column(Boolean, default=False)