# TODO APP FE

## Tecnologías Utilizadas

- **React**: ^18.3.1
- **TypeScript**: ^5.5.3
- **Tailwind CSS**: ^3.4.1
- **Vite**: ^5.4.2
- **i18next**: ^23.15.2 (para internacionalización)
- **ESLint**: ^9.9.1 (para linting)
- **React Toastify**: ^10.0.5 (para notificaciones)
- **Lucide React**: ^0.344.0 (para íconos)

## Estructura del Proyecto

```
.vscode/
.gitignore
eslint.config.js
index.html
package.json
postcss.config.js
src/
  ├── App.tsx
  ├── components/
  │     ├── ConfirmDialog.tsx
  │     ├── Login.tsx
  │     ├── TaskCard.tsx
  │     ├── TaskDetailPopup.tsx
  │     ├── TaskForm.tsx
  │     └── TaskList.tsx
  ├── i18n/
  │     ├── en.json
  │     └── es.json
  ├── index.ts
  ├── index.css
  ├── main.tsx
  ├── types.ts
  └── vite-env.d.ts
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## Dependencias

### Dependencias de Producción

- `@types/js-cookie`: ^3.0.6
- `i18next`: ^23.15.2
- `js-cookie`: ^3.0.5
- `lucide-react`: ^0.344.0
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-i18next`: ^13.5.0
- `react-toastify`: ^10.0.5

### Dependencias de Desarrollo

- `@eslint/js`: ^9.9.1
- `@types/react`: ^18.3.5
- `@types/react-dom`: ^18.3.0
- `@vitejs/plugin-react`: ^4.3.1
- `autoprefixer`: ^10.4.18
- `eslint`: ^9.9.1
- `eslint-plugin-react-hooks`: ^5.1.0-rc.0
- `eslint-plugin-react-refresh`: ^0.4.11
- `globals`: ^15.9.0
- `postcss`: ^8.4.35
- `tailwindcss`: ^3.4.1
- `typescript`: ^5.5.3
- `typescript-eslint`: ^8.3.0
- `vite`: ^5.4.2

## Configuración de ESLint

El archivo `eslint.config.js` contiene la configuración de ESLint para este proyecto. Incluye configuraciones recomendadas para JavaScript y TypeScript, así como plugins para React Hooks y React Refresh.

## Configuración de Tailwind CSS

El archivo `tailwind.config.js` contiene la configuración de Tailwind CSS para este proyecto.

## Configuración de TypeScript

El proyecto incluye varios archivos de configuración de TypeScript:

- `tsconfig.json`: Configuración principal de TypeScript.
- `tsconfig.app.json`: Configuración específica para la aplicación.
- `tsconfig.node.json`: Configuración específica para Node.js.

## Configuración de Vite

El archivo `vite.config.ts` contiene la configuración de Vite para este proyecto.

## Internacionalización

El proyecto utiliza `i18next` para la internacionalización. Los archivos de traducción se encuentran en el directorio `src/i18n/`.

## Componentes

Los componentes de React se encuentran en el directorio `src/components/`.

## Cómo Correr el Proyecto en Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el Repositorio

Primero, clona este repositorio en tu máquina local:

```bash
git clone https://github.com/usuario/nombre-del-proyecto.git
cd nombre-del-proyecto
```

### 2. Instalar Dependencias

Asegúrate de tener [Node.js](https://nodejs.org/) y [Yarn](https://yarnpkg.com/) instalados. Luego, instala las dependencias:

```bash
yarn install
```

### 3. Correr el Proyecto

Para ejecutar el proyecto en modo de desarrollo, utiliza el siguiente comando:

```bash
yarn dev
```

Esto abrirá el proyecto en tu navegador en la URL predeterminada: `http://localhost:5173`.

### 4. Generar una Build de Producción

Si deseas crear una build para producción, utiliza el siguiente comando:

```bash
yarn build
```

Esto generará los archivos estáticos en el directorio `dist/`.

### 5. Previsualizar la Build

Puedes previsualizar la build de producción utilizando:

```bash
yarn preview
```

## URL en Producción

Puedes ver el proyecto en vivo en la siguiente URL:

[https://todoappcd.netlify.app/](https://todoappcd.netlify.app/)

## Licencia

Este proyecto está licenciado bajo la MIT License.
