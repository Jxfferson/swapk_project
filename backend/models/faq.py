from db import Base
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text, Boolean

class FAQ(Base):
        __tablename__ = 'faq'
        id = Column(Integer, primary_key=True)
        pregunta = Column(Text)
        respuesta = Column(Text)
        orden = Column(Integer)