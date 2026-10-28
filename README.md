# MediCita — Actividad 8 — Equipo 02

## Integrantes
- RUIZ OSANTE ANGEL YIBAN
- ANTONIO VAZQUEZ KARLA GUADALUPE

Aplicación web en **React** para la gestión de un consultorio médico. Incluye inicio de sesión contra la API de **DummyJSON**, un dashboard con sidebar y navbar, y un catálogo de productos con búsqueda, filtro por categoría, paginación y operaciones CRUD, con los filtros sincronizados en la URL.

- **Sitio desplegado (VPS):** http://138.68.234.30/t3_act8_eq02/login
- **Repositorio:** https://github.com/AngelOxe/t3_act8_eq02
- **Diseño base:** mockup de Figma
- **API utilizada:** https://dummyjson.com/products

## Instalación y ejecución

Requiere Node.js 20.19+ o 22.12+ y npm.

```bash
git clone https://github.com/AngelOxe/t3_act8_eq02.git
cd t3_act8_eq02
npm install
npm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173/t3_act8_eq02/`).

Otros comandos:

```bash
npm run build     # genera la carpeta dist/
npm run preview   # sirve el build para probarlo localmente
```

### Credenciales de prueba

| Usuario | Contraseña |
| --- | --- |
| `emilys` | `emilyspass` |

El login también acepta el correo electrónico del usuario de DummyJSON. La pantalla incluye un botón para cargar estas credenciales.

## Funcionalidades por módulo

### Módulo 1 — Autenticación y login
- Formulario con validación de campos vacíos y mensajes de error claros.
- Login contra `POST /auth/login` de DummyJSON; el perfil se obtiene de `GET /auth/me`.
- Estado de sesión global con Context API (`AuthContext`).
- La sesión se conserva al recargar y se cierra al pulsar "Cerrar sesión".
- Opción "Recordar usuario".

### Módulo 2 — Dashboard, sidebar y navbar
- Layout según el diseño de Figma, con sidebar y navbar adaptables a móvil.
- Navegación entre Dashboard, Catálogo API, Pacientes y Horarios (las dos últimas son vistas simuladas).
- Datos del usuario (nombre, correo y foto) tomados de DummyJSON.
- **Rutas protegidas:** si no hay sesión, se redirige a `/login` y, al iniciar sesión, se vuelve a la página solicitada.
- Los indicadores y citas del dashboard son datos ilustrativos.

### Módulo 3 — Tabla con filtros y paginación
- Productos obtenidos de `https://dummyjson.com/products`.
- Búsqueda por texto (con espera de 400 ms para no llamar a la API en cada tecla).
- Filtro por categoría.
- Paginación con selector de registros por página (10, 20, 40 o 50).
- **Sincronización con la URL:** los filtros se guardan en parámetros, por ejemplo `/productos?search=phone&category=smartphones&page=2&limit=20`. Al recargar o compartir el enlace se conserva el estado, y los botones atrás/adelante del navegador funcionan.
- Estados de carga y de error, y cancelación de peticiones anteriores con `AbortController`.

### Módulo 4 — Operaciones CRUD
- **Crear** (`POST /products/add`), **editar** (`PUT /products/{id}`) y **eliminar** (`DELETE /products/{id}`) mediante peticiones reales.
- Formulario con validaciones: nombre (mínimo 3 caracteres), categoría obligatoria, precio mayor a 0 y stock entero de 0 o más.
- Confirmación antes de editar y antes de eliminar.
- Mensajes de éxito y de error, y actualización local de la tabla y del total.

> **Importante:** DummyJSON **simula** las escrituras. Responde como si la operación hubiera funcionado, pero no guarda los cambios. Por eso los cambios se reflejan en la tabla solo durante la sesión actual y se pierden al recargar la página. Los productos creados por el usuario tampoco existen en la API: al editarlos o eliminarlos, el error 404 de la API se ignora y el cambio se aplica solo localmente.


## Capturas de figma 
**Login**
<img width="990" height="655" alt="image" src="https://github.com/user-attachments/assets/fa4df7a4-f985-475b-8f09-3a299b2d4d78" />

**Dashboard**
<img width="953" height="633" alt="image" src="https://github.com/user-attachments/assets/fdad6b7b-e3bf-42ef-b22b-8a073f7b8b13" />

**Gestion de citas**
<img width="968" height="634" alt="image" src="https://github.com/user-attachments/assets/05dba2c0-5d92-49c8-be55-b317d73b805a" />




