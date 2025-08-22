from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from backend.db.database import get_db
from backend.models import usuarios
from backend.schemas.user_schema import UserResponse, UserUpdate
from backend.services.oauth2 import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])
ph = PasswordHasher()

# ✅ Obtener perfil del usuario autenticado
@router.get("/me", response_model=UserResponse)
def get_my_profile(current_user: UserResponse = Depends(get_current_user)):
    return current_user

# ✅ Actualizar datos del usuario autenticado
@router.put("/me", response_model=UserResponse)
def update_user(
    update_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):
    if update_data.username:
        current_user.nombre = update_data.username  # ojo: en tu modelo DB el campo es "nombre"
    if update_data.email:
        current_user.email = update_data.email

    db.commit()
    db.refresh(current_user)
    return current_user

# ✅ Cambiar contraseña
@router.put("/me/change-password")
def change_password(
    old_password: str,
    new_password: str,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):
    try:
        # Verificar la contraseña actual
        ph.verify(current_user.password, old_password)
    except VerifyMismatchError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Contraseña actual incorrecta"
        )

    # Guardar nueva contraseña
    current_user.password = ph.hash(new_password)
    db.commit()
    return {"msg": "Contraseña actualizada con éxito"}

# ✅ Eliminar cuenta
@router.delete("/me")
def delete_account(
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):
    db.delete(current_user)
    db.commit()
    return {"msg": "Cuenta eliminada correctamente"}
