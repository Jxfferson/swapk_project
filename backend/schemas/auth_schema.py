from pydantic import BaseModel, EmailStr

class RegisterRequest(BaseModel):
    nombre: str
    email: EmailStr
    password: str  # Aquí la contraseña en texto plano

class LoginRequest(BaseModel):
    nombre: str
    email: EmailStr
    password: str  # Contraseña en texto plano para validar luego
