# Guía de Estándares de Código para el Proyecto Swapk

Esta guía establece las reglas y convenciones para mantener un código limpio, consistente y fácil de mantener en el proyecto **Swapk**. Incluye normas para Python (FastAPI) y JavaScript (Node.js con NestJS).

---

## 1. Reglas de Nombres

### Python (FastAPI)
- **Variables:** snake_case  
- **Clases:** PascalCase  
- **Métodos/Funciones:** snake_case  
- **Constantes:** UPPER_CASE  
- **Archivos:** snake_case.py  

**Ejemplos aceptados:**  
`user_name`, `UserProfile`, `get_user_data()`  

**Ejemplos no aceptados:**  
`User_name`, `userProfile`, `GetUserData`  

---

### JavaScript / Node.js (NestJS)
- **Variables:** camelCase  
- **Clases:** PascalCase  
- **Métodos/Funciones:** camelCase  
- **Constantes:** UPPER_CASE  
- **Archivos:** kebab-case.js o camelCase.js (según convención del proyecto)  

**Ejemplos aceptados:**  
`userName`, `UserService`, `getUserData()`  

**Ejemplos no aceptados:**  
`user_name`, `userServiceClass`, `GetUser_Data`  

---

## 2. Comentarios y Documentación Interna

- Usar comentarios claros y concisos para explicar lógica compleja.  
- Evitar comentarios obvios (no describir lo evidente).  
- Preferir **docstrings** en Python y **JSDoc** en JavaScript para documentar funciones, clases y módulos.

### Ejemplo Python (docstring):

```python
def calculate_discount(price: float, discount: float) -> float:
    """
    Calcula el precio final aplicando un descuento.

    Args:
        price (float): Precio original.
        discount (float): Porcentaje de descuento (0-100).

    Returns:
        float: Precio final con descuento aplicado.
    """
    return price * (1 - discount / 100)
```    


### Ejemplo JavaScripts (JSDoc):


/**
 * Calcula el precio final aplicando un descuento.
 * @param {number} price - Precio original.
 * @param {number} discount - Porcentaje de descuento (0-100).
 * @returns {number} Precio final con descuento.
 */
```
function calculateDiscount(price, discount) {
  return price * (1 - discount / 100);
}
```

### 2. Identación y estilos de codigo

    Indentación: 4 espacios en Python, 2 espacios en JavaScript.

    Líneas: máximo 120 caracteres.

    Llaves:

    Python: no usa llaves, depende de la indentación.

    JavaScript: { en la misma línea.

    Espaciado:

    Espacio después de comas y operadores.

    Espacios antes y después de operadores lógicos y aritméticos.


### Ejemplo Python (correcto):

```
if user_is_active and user_balance > 0:
    process_payment(user_id)
```

### Ejemplo JavaScripts (correcto):

```
if (userIsActive && userBalance > 0) {
  processPayment(userId);
} 
```

### 4. Ejemplos Aceptados y No Aceptados

### Python aceptado

```
def get_user(id: int) -> dict:
    """Obtiene un usuario por ID."""
    user = db.get_user_by_id(id)
    return user
```

### No Aceptado:

```
def GetUser(ID):
    # obtiene un usuario
    user=db.get_user_by_id(ID)
    return user
```
### JavaScripts (NestJS)

### Aceptado 
```
async findUserById(id) {
  const user = await this.userRepository.findOne({ where: { id } });
  return user;
}
```
### No aceptado
```
async Find_user_by_Id(ID){
    let User = await this.userRepository.findOne({id:ID})
    return User
}
```
