# backend/app/schemas/forgot_password_schema.py
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional
from datetime import datetime

class ForgotPasswordRequest(BaseModel):
    """
    Esquema para la solicitud de recuperación de contraseña
    """
    email: EmailStr = Field(
        ...,
        example="usuario@ejemplo.com",
        description="Email registrado en el sistema"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "email": "usuario@ejemplo.com"
            }
        }


class ResetPasswordRequest(BaseModel):
    """
    Esquema para el reset de contraseña
    """
    token: str = Field(
        ...,
        min_length=32,
        max_length=256,
        description="Token de verificación enviado por email"
    )
    new_password: str = Field(
        ...,
        min_length=8,
        max_length=64,
        description="Nueva contraseña"
    )
    confirm_password: str = Field(
        ...,
        description="Confirmación de la nueva contraseña"
    )

    @validator('confirm_password')
    def passwords_match(cls, v, values, **kwargs):
        if 'new_password' in values and v != values['new_password']:
            raise ValueError('Las contraseñas no coinciden')
        return v

    class Config:
        json_schema_extra = {
            "example": {
                "token": "token_generado_por_el_sistema",
                "new_password": "NuevaContraseña123!",
                "confirm_password": "NuevaContraseña123!"
            }
        }


class PasswordResetOut(BaseModel):
    """
    Esquema para la respuesta de reset de contraseña
    """
    message: str = Field(
        ...,
        example="Contraseña actualizada exitosamente",
        description="Mensaje de confirmación"
    )
    timestamp: datetime = Field(
        default_factory=datetime.utcnow,
        description="Fecha y hora de la operación"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "message": "Contraseña actualizada exitosamente",
                "timestamp": "2023-07-20T14:30:00Z"
            }
        }