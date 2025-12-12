## ¿Para qué sirven los archivos de test principales?

- **auth.test.ts**: Prueba todas las funciones de autenticación y manejo de tokens, asegurando que la lógica de login, logout y validación de sesión funciona correctamente.
- **Loader.test.tsx**: Verifica que el componente Loader renderiza correctamente el mensaje, la imagen y la estructura de estilos esperada.
- **ProjectCard.test.tsx**: Asegura que el componente ProjectCard muestra la información del proyecto, el enlace y el caption correctamente, y soporta la ausencia de props opcionales.
- **config.test.ts**: Prueba la función de utilidades para obtener la URL base de la API, cubriendo todos los escenarios posibles de configuración.

Estos archivos ayudan a garantizar la calidad, el correcto funcionamiento y la mantenibilidad del frontend del proyecto.
## Autenticación en Swagger UI

Actualmente, Swagger UI no muestra el botón "Authorize" porque el esquema de seguridad no está definido en el swagger.json. Para probar endpoints protegidos:

- **Desde Swagger UI:**
	- Haz clic en el endpoint que quieres probar (por ejemplo, POST /v1/proyectos).
	- Haz clic en "Try it out".
	- Si Swagger permite agregar headers, añade:
		- Key: `Authorization`
		- Value: `Bearer TU_TOKEN_AQUI` (reemplaza `TU_TOKEN_AQUI` por el JWT obtenido en /auth/login).
	- Si Swagger no permite agregar headers, usa Postman o Insomnia.

- **Desde Postman:**
	- Crea una nueva petición al endpoint deseado.
	- Ve a la pestaña "Headers" y agrega:
		- Key: `Authorization`
		- Value: `Bearer TU_TOKEN_AQUI`
	- Envía la petición.

- **Para habilitar el botón "Authorize" en Swagger UI en el futuro:**
	- Modifica el archivo swagger.json y agrega el siguiente bloque en la sección `components`:
		```json
		"components": {
			"securitySchemes": {
				"bearerAuth": {
					"type": "http",
					"scheme": "bearer",
					"bearerFormat": "JWT"
				}
			}
		},
		"security": [
			{
				"bearerAuth": []
			}
		]
		```
	- Así aparecerá el botón "Authorize" y podrás pegar el token una sola vez para todas las peticiones protegidas.
## ¿Cómo ejecutar el proyecto?

### 1. Backend (API)
En una terminal, ve a la carpeta `api` y ejecuta:

```bash
cd api
npm install
npm run build
npm start
```
Esto levantará la API en http://localhost:4000

### 2. Frontend (Vite)
En otra terminal, ve a la carpeta `ui` y ejecuta:

```bash
cd ui
npm install
npm run dev
```
Esto abrirá la web en http://localhost:5173

### 3. Documentación Swagger
Con el backend corriendo, accede a http://localhost:4000/docs para ver la documentación interactiva de la API.

## URLs de acceso rápido

- **API Backend:** [http://localhost:4000](http://localhost:4000)
- **Documentación Swagger (API):** [http://localhost:4000/docs](http://localhost:4000/docs)
- **Frontend (Vite):** [http://localhost:5173](http://localhost:5173)

# Proyecto Testing y Seguridad

![Frontend](./doc/BBDD.svg)

## Documentación

Puedes encontrar la documentación para este proyecto en [este enlace](https://testing-y-seguridad.netlify.app/).

## Setup


## Reporte de archivos de test y configuración Jest

Para facilitar la consulta y auditoría de pruebas, estos son los archivos clave relacionados con testing y cobertura:

### Configuración de Jest
- `ui/jest.config.cjs`
- `ui/jest.setup.cjs`
- `ui/__mocks__/fileMock.js`

### Archivos de test principales
- `ui/src/utils/__tests__/auth.test.ts`
- `ui/src/components/elements/__tests__/Loader.test.tsx`
- `ui/src/components/cards/__tests__/ProjectCard.test.tsx`
- `ui/src/utils/__tests__/config.test.ts`

### Reporte de coverage
- El reporte de cobertura se genera automáticamente en `ui/coverage/` tras ejecutar `npm test -- --coverage`. Incluye el resumen en texto y el reporte HTML en `ui/coverage/lcov-report/index.html`.

Todos los tests se ejecutan correctamente y la cobertura supera el 90% en los módulos principales.
