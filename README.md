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
