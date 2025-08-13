# Git Workflow para el Proyecto Swapk

Este documento define las prácticas y convenciones para el uso de Git en el proyecto **Swapk**, con el objetivo de mantener un historial de código limpio, coherente y fácil de mantener.

---

## Convenciones de Commits

Utilizamos la convención de mensajes de commit basada en [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0-beta.2/), que facilita la automatización de versiones y changelogs.

### Formato del mensaje de commit

<tipo>(ámbito): <descripción corta>
<espacio en blanco>
<explicación detallada opcional>
<espacio en blanco>
<nota opcional>


### Tipos de commits

- `feat`: Añade una nueva característica.
- `fix`: Corrige un error.
- `docs`: Cambios en la documentación.
- `style`: Cambios de formato que no afectan la funcionalidad.
- `test`: Añade o modifica pruebas.
- `chore`: Tareas de mantenimiento sin cambios en la funcionalidad.

### Ejemplos

feat(auth): implementar autenticación JWT

fix(api): corregir error en endpoint de usuarios

docs(readme): actualizar instrucciones de instalación

style(ui): mejorar espaciado en formulario de login

refactor(models): renombrar clase UserProfile a UserDetail


### Tipos de commit

- `feat`: Añade una nueva característica.
- `fix`: Corrige un error.
- `docs`: Cambios en la documentación.
- `style`: Cambios de formato que no afectan la funcionalidad.
- `refactor`: Refactoriza el código sin cambiar su funcionalidad.
- `perf`: Mejora el rendimiento.
- `test`: Añade o modifica pruebas.
- `chore`: Tareas de mantenimiento sin cambios en la funcionalidad.

### Ejemplos

feat(auth): implementar autenticación JWT
fix(api): corregir error en endpoint de usuarios
docs(readme): actualizar instrucciones de instalación
style(ui): mejorar espaciado en formulario de login
refactor(models): renombrar clase UserProfile a UserDetail

markdown
Copiar
Editar

> **Nota:** Los mensajes deben estar en tiempo presente, ser concisos y no llevar punto final.

---

## Frecuencia de Push/Pull

- **Pull:** Antes de comenzar a trabajar en una nueva tarea, realiza un `git pull` para asegurarte de que tu rama local esté actualizada con la rama principal (generalmente `main` o `develop`).
- **Push:** Realiza un `git push` después de completar una tarea o una parte significativa de ella. Asegúrate de que tus commits sean atómicos y estén bien definidos.
- **Pull Frecuente:** Realiza `git pull` al menos una vez al día para mantener tu rama actualizada y evitar conflictos.

---

## Política de Pull Requests

1. **Creación de Pull Requests:**
   - Crea un pull request (PR) para integrar tus cambios en la rama principal.
   - Asegúrate de que el PR tenga un título claro y una descripción detallada de los cambios realizados.

2. **Revisión de Pull Requests:**
   - Todos los PR deben ser revisados por al menos una persona antes de ser fusionados.
   - La revisión debe enfocarse en la calidad del código, la funcionalidad y la coherencia con las convenciones establecidas.

3. **Aprobación y Fusión:**
   - Una vez aprobado, el PR puede ser fusionado utilizando la estrategia de "squash and merge" para mantener un historial limpio.
   - Evita realizar fusiones directas a la rama principal sin revisión previa.

4. **Actualización de la Rama:**
   - Antes de fusionar, asegúrate de que tu rama esté actualizada con la última versión de la rama principal para evitar conflictos.
---
## Herramientas Recomendadas
- **Commitizen:** Para facilitar la creación de mensajes de commit siguiendo las convenciones establecidas.
---
