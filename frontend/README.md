# **Swapk - Frontend**

Desarrollado por:\
**Daniel Alejandro Rangel**\
**Jefferson Stic Correa López**

------------------------------------------------------------------------

## **Descripción del Proyecto**

Este repositorio contiene el **frontend** del proyecto **Swapk**,
desarrollado con **Next.js** y **TypeScript**, con un enfoque modular,
escalable y de fácil mantenimiento.\
El diseño de la interfaz se apoya en **React**, **Tailwind CSS** y
**Lucide React** para ofrecer un estilo moderno, optimizado y con
componentes reutilizables.

------------------------------------------------------------------------

## **Tecnologías Utilizadas**

-   **React** → Librería principal para la construcción de interfaces de
    usuario.\
-   **Next.js** → Framework para React que optimiza el rendimiento y
    ofrece funcionalidades avanzadas como renderizado del lado del
    servidor (SSR) y generación estática de páginas (SSG).\
-   **TypeScript** → Superset de JavaScript que añade tipado estático,
    mejorando la mantenibilidad y escalabilidad del código.\
-   **Tailwind CSS** → Framework CSS basado en utilidades para crear
    interfaces modernas y personalizables con facilidad.\
-   **Lucide React** → Librería de íconos moderna y flexible para
    React.\
-   **PostCSS & Autoprefixer** → Herramientas para el procesamiento
    avanzado de CSS.

------------------------------------------------------------------------

## **Instalación y Configuración Inicial**

> **Requisitos previos:**\
> - Node.js (v16 o superior)\
> - npm o yarn

### **Clonar el repositorio**

``` bash
git clone <url-del-repositorio>
cd frontend
```

### **Instalación de dependencias principales (estilos)**

``` bash
npm install react react-dom @types/react @types/react-dom
```

### **Instalar Lucide React (iconos)**

``` bash
npm install lucide-react
```

### **Instalar Next.js**

``` bash
npm install next
```

### **Instalar TypeScript (opcional si se desea usar TS)**

``` bash
npm install -D typescript @types/node
```

### **Instalación completa en un solo paso**

``` bash
npm install react react-dom next lucide-react @types/react @types/react-dom @types/node typescript
```

### **Instalar y configurar Tailwind CSS**

``` bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

------------------------------------------------------------------------

## **Ejecución del proyecto en desarrollo**

``` bash
npm run dev
```

Por defecto, el proyecto se ejecutará en: <http://localhost:3000>

------------------------------------------------------------------------

## **Estructura de Carpetas Recomendada**

    frontend/
    ├── src/
    │   ├── app/              # Páginas y layouts
    │   ├── assets/           # Recursos estáticos
    │   ├── components/       # Componentes reutilizables
    │   ├── styles/           # Archivos CSS y configuración Tailwind
    │   └── pages/            # Páginas adicionales si se usan convenciones de Next.js
    ├── public/               # Archivos públicos
    ├── package.json          # Configuración de dependencias
    ├── tsconfig.json         # Configuración TypeScript
    └── tailwind.config.js    # Configuración Tailwind CSS

------------------------------------------------------------------------

## **Contribuidores**

-   **Daniel Alejandro Rangel**\
-   **Jefferson Stic Correa López**

------------------------------------------------------------------------

## **Licencia y Derechos de Autor**

Copyright © 2025 Daniel Alejandro Rangel & Jefferson Stic Correa López\
Todos los derechos reservados.

Este proyecto se encuentra bajo licencia propietaria. No está permitido
el uso, modificación o distribución sin el consentimiento explícito de
los autores.
