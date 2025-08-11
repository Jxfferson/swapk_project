from fastapi import FastAPI
from db.database import Base, engine
from backend.controllers.habilidad_controller import router as habilidad_router
from backend.controllers.auth_controller import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost:3000",  # Aquí la URL de tu frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir frontend
    allow_credentials=True,
    allow_methods=["*"],    # Permitir todos los métodos (POST, GET, etc)
    allow_headers=["*"],    # Permitir todos los headers
)

# Crear tablas (solo para desarrollo)
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "API funcionando"}

# Incluir routers
app.include_router(habilidad_router)
app.include_router(auth_router)

