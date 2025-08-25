from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.db.database import Base, engine
from backend.controllers.auth_controller import router as auth_router
from backend.controllers.habilidad_controller import router as habilidad_router
from backend.controllers.forgot_password_controller import router as forgot_password_router
from backend.controllers import google_auth_controller 
from backend.controllers.user_controller import router as user_router
from backend.services.oauth2 import get_current_user
from backend.controllers.perfil_controller import router as perfil_router
app = FastAPI()

# Configuración CORS
origins = [
    "http://localhost:3000",  # tu frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base de datos
Base.metadata.create_all(bind=engine)

# Rutas
app.include_router(auth_router, prefix="/auth")
app.include_router(habilidad_router)
app.include_router(forgot_password_router)
app.include_router(google_auth_controller.router, prefix="/auth/google", tags=["google-auth"])
app.include_router(user_router)
app.include_router(perfil_router)