from pydantic import BaseModel, EmailStr, constr
from typing import Optional

# ✅ Para devolver info del usuario (perfil sin contraseña)
class UserResponse(BaseModel):
    id: int
    nombre: str
    email: EmailStr

    class Config:
        orm_mode = True

# ✅ Para actualizar datos del usuario
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
