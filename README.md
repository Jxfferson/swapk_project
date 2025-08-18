# 📚 SWAPK - Plataforma de Trueque de Conocimientos

Aplicación web moderna que permite a los usuarios intercambiar habilidades y conocimientos por medio de cursos, trueques, chat y videollamadas. Construida con tecnologías de última generación, centrada en experiencia de usuario, seguridad y escalabilidad.

---

## 🚀 Tecnologías Utilizadas

- **Frontend**: React + TypeScript
- **Estilos**: Tailwind CSS + Lucide React (íconos)
- **Backend**: NestJS (TypeScript)
- **Base de datos**: MongoDB
- **Control de versiones**: Git + GitHub
- **CI/CD**: GitHub Actions (opcional)

---

## 📁 Estructura del Proyecto

```
swapk_proyecto/
│
├── backend/                  # NestJS + Python
│   ├── Collection/
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── .env
│   └── main.py
│   ├── alembic.ini
│   └── requirements.txt
│
├── frontend/
│   ├── public/                 # React + Tailwind + TS
│   │   ├── img/
│   │   │   ├── login/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── styles/
│   │   ├── pages/
│   │   │   ├── App.tsx
│   │   ├── services/
│   ├── global.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Requisitos Previos

- Node.js v18+
- npm v9+
- MongoDB instalado local o remoto (Mongo Atlas)
- VSCode con extensiones de Tailwind, ESLint y Prettier

---

## 🛠️ Instalación del entorno local

### 1. Clona el repositorio

```bash
git clone https://github.com/Jxfferson/swapk_project.git
cd swapk_project.git
```

---

### 2. Configura el entorno

#### 🧩 Backend (NestJS)

```bash
cd backend
npm install
cp .env.example .env
```

Archivo `.env` de ejemplo:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/swapk
JWT_SECRET=swapkSecretKey
```

```bash
npm run start:dev
```

---

#### 🎨 Frontend (React + Tailwind)

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Scripts útiles

| Comando             | Descripción                                 |
|---------------------|---------------------------------------------|
| `npm run dev`       | Inicia el frontend en modo desarrollo       |
| `npm run start:dev` | Inicia el backend NestJS con recarga        |
| `npm run build`     | Compila el proyecto                         |
| `npm run lint`      | Revisa el estilo de código con ESLint       |

---

## 🎯 Estándares de Código

- Linting con **ESLint**
- Tipado estricto con **TypeScript**
- Componentes atómicos y reutilizables en React

---

## 🧩 Librerías destacadas

- **Lucide React**: íconos SVG modernos
- **Zod** (opcional): validaciones en frontend
- **class-validator**: validaciones en NestJS
- **Mongoose**: ODM para MongoDB en NestJS

---

## 📦 Funcionalidades Actuales

- Registro e inicio de sesión de usuarios
- Gestión de cursos e intercambios
- Sistema de chat entre usuarios
- Gestión de reseñas y notificaciones
- Videollamadas (WebRTC o integración externa)

---

## 🛡️ Seguridad

- Contraseñas encriptadas con bcrypt
- Tokens JWT para sesiones
- Roles definidos: Usuario, Administrador, Auditor

---

## 🛠️ CI/CD (opcional)

Puedes agregar un workflow con GitHub Actions:

- Test → Build → Deploy automático
- Linter + verificación de tipos

---

## 🧑‍💻 Equipo

- Jefferson Stic Correa – Frontend + UI/UX
- Daniel Alejandro Rangel – Backend + QA

---

## 📝 Licencia

MIT – Uso libre para fines educativos