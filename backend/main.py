#Rutas REST del proyecto.

#Importación de el objeto aplicación

from fastapi import FastAPI
from controllers.habilidad_controller import router

#Crear el objeto aplicación

app = FastAPI()


#Conectar el grupo 'categorias' al objeto aplicación#Conectar el grupo 'categorias' al objeto aplicación
app.include_router(router=router)


