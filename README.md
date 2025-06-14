# 📋 Task Manager - Frontend (Angular)

![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular) 
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black) 
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

Aplicación de gestión de tareas con autenticación por email y operaciones CRUD. Conectada a un backend en Firebase Cloud Functions.

## 🚀 Demo

[![Demo en vivo](https://img.shields.io/badge/Ver-Demo_En_Vivo-2EA44F?style=for-the-badge)](https://task-manager-challenge.web.app/login)

<div style="display: flex; gap: 15px; justify-content: center; margin: 20px 0;">
  <img src="./src/assets/images/login.png" alt="Vista de Login" style="width: 45%; border: 1px solid #ddd; border-radius: 8px;">
  <img src="./src/assets/images/menu.png" alt="Vista de Menú" style="width: 45%; border: 1px solid #ddd; border-radius: 8px;">
</div>

## 🎯 Características

- **Autenticación simplificada**:
  - Login con solo email
  - Auto-creación de usuario si no existe
- **Gestión completa de tareas**:
  - ✅ Listas/Crear/Editar/Eliminar tareas
  - 🗓️ Ordenación automática por fecha
  - 🔍 Filtrado por titulo y estado (completadas/pendientes)
- **Notificaciones** con feedback visual
- **Diseño responsive** con Angular Material
- **Arquitectura reactiva** usando Angular Signals
- **Material Design** con Angular Material

## 🛠️ Tecnologías

| Tecnología       | Uso                              |
|------------------|----------------------------------|
| Angular 17       | Framework principal              |
| RxJS & Signals   | Manejo de estados y streams      |
| Angular Material | Componentes UI                   |
| Firebase         | Hosting y backend (Cloud Functions) |
| TypeScript       | Tipado estático                  |

## 🏗️ Estructura del Proyecto

```bash
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   └── tasks/
│   │   ├── shared/
│   │   │   └── components/
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   └── assets/
└── ...
```

## Cómo Empezar
- Node.js v20+
- Angular CLI
- Cuenta de Firebase


## Instalación
1. Clonar repositorio:

```bash
git clone https://github.com/JavierExeni/frontend-task-manager.git
cd frontend-task-manager
```

2. Instalar dependencias:

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
ng serve -o

# Construir para producción
ng build

# Ejecutar tests
ng test

# Linting
ng lint
```

3. Configurar entorno:

```bash
export const environment = {
  production: false,
  apiUrl: "http://..."
};
```

## Despliegue

1. Build de producción:

```bash
ng build --configuration production
```

2. Desplegar a Firebase Hosting:

```bash
firebase deploy
```
