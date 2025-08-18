from pydantic import BaseModel, EmailStr, Field
import re
from typing import Optional

class RegisterRequest(BaseModel):
    nombre: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    emailOrUsername: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class VerifyCodeRequest(BaseModel):
    email: EmailStr
    code: str = Field(..., min_length=6, max_length=6)

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    code: str = Field(..., min_length=6, max_length=6)
    new_password: str = Field(..., min_length=8)
    
    @classmethod
    def validate_password(cls, password: str) -> bool:
        """Valida que la contraseña cumpla con requisitos mínimos"""
        if len(password) < 8:
            return False
        if not re.search(r"[A-Z]", password):
            return False
        if not re.search(r"[a-z]", password):
            return False
        if not re.search(r"[0-9]", password):
            return False
        return True

# Opcional: Modelo para respuesta de usuario
class UserResponse(BaseModel):
    id: int
    nombre: str
    email: EmailStr
    is_active: bool

    class Config:
        orm_mode = True

# Opcional: Modelo para token de autenticación
class Token(BaseModel):
    access_token: str
    token_type: str