from fastapi import FastAPI
from backend.db.database import Base, engine
from backend.controllers.habilidad_controller import router as habilidad_router
from backend.controllers.auth_controller import router as auth_router
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import Response

app = FastAPI()


origins = [
    "http://localhost:3000",  # URL de tu frontend
]

# Se agrega un iddleware que devuelva errores internos a los headers
@app.middleware("http")
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception:
        return Response("Internal server error", status_code=500)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permitir frontend
    allow_credentials=True,
    allow_methods=["*"],    # Permitir todos los métodos (POST, GET, etc)
    allow_headers=["*"],    # Permitir todos los headers
)


Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "API funcionando"}

# Incluir routers
app.include_router(habilidad_router)
app.include_router(auth_router)

