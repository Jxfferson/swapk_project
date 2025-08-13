from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.schemas.habilidad_schema import HabilidadCreateDTO
from backend.db.sessions import SessionLocal
from backend.models.habilidad import Habilidad

#ApiRouter permite dividir las rutas en archivos

#Objeto que contiene este grupo de rutas

router = APIRouter(prefix='/habilidades')

#Crear cada ruta en el grupo


#Obtener el objeto session para Create

def get_session():
    db = SessionLocal() 
    try: 
        yield db
    finally:
        db.close()    
#Endpoints de prueba

@router.get('/')
def listar_habilidades(): 
    return "Lista de habilidades"

#Ruta parametrada
@router.get('/{id}')
def listar_habilidades_por_id(id: int):
    return "Lista habilidad cuyo id es : " +str(id)

#Ruta post

@router.post('/{id}')
def crear_habilidad(
    nueva_habilidad: HabilidadCreateDTO, 
    db:Session = Depends(get_session)
    ):
    
   #Crear la habilidad 
   nv = Habilidad(
       nombre = nueva_habilidad.nombre,
       tipo = nueva_habilidad.tipo,
       categoria = nueva_habilidad.categoria
   )
   #Inserta la nueva habilidad
   db.add(nv)
   #Confirma la transacciòn manualmente
   db.commit()
   #Nueva categoria la dispongo en proyecto
   db.refresh(nv)
   #Se retorna nv
   return nv

#Ruta put (Esta tiene que ver con que actualizas todos los atributos en un objeto)

@router.put('/{id}')
def actualizar_habilidad(id: int):
    return "Actualizando la habilidad n " +str(id)


#Ruta path (Aca si se puede elegir un solo dato para hacerlo)


#Ruta delete
@router.delete('/{id}')
def eliminar_habilidad(id: int):
    return "Eliminando la hanilidad n " +str(id)