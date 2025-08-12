from pydantic import BaseModel, EmailStr

class RegisterRequest(BaseModel):
    nombre: str
    email: EmailStr
    password: str 

class LoginRequest(BaseModel):
    emailOrUsername: str
    password: str 
