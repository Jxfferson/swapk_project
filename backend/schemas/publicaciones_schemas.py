from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PublicacionCreate(BaseModel):
    titulo: str
    contenido: str
    tipo: str = "Intercambio"
    imagen: Optional[str] = None 

class ComentarioCreate(BaseModel):
    contenido: str
    id_publicacion: int
    id_comentario_padre: int = None


