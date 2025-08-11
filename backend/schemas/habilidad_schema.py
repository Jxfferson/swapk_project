from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class HabilidadCreateDTO(BaseModel):
    nombre: str
    tipo: str
    categoria: str
     