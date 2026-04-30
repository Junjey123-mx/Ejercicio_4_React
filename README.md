# Rock & Pop Archive

Mini-blog musical desarrollado con Vite, React y React Router DOM v6.  
El proyecto permite explorar artistas de rock y pop, buscar dentro del listado, consultar detalles usando una ruta dinámica, consumir información visual desde TheAudioDB y guardar artistas favoritos mediante estado global con Context API.

---

## Nivel seleccionado

Este proyecto apunta al **nivel Senior (100 puntos)**.

---

## Tema del proyecto

Rock & Pop Archive es un archivo musical interactivo enfocado en artistas de rock, pop y géneros relacionados. La aplicación permite:

- Explorar un listado de artistas con tarjetas reutilizables.
- Buscar por nombre, género o país en tiempo real.
- Abrir la página de detalle de cada artista mediante rutas dinámicas.
- Consultar información obtenida desde TheAudioDB: imagen, biografía y discografía.
- Ver imágenes y álbumes relacionados cargados desde la API.
- Guardar artistas favoritos con estado global persistente en la sesión.
- Cambiar entre tema claro y oscuro con preferencia guardada en `localStorage`.
- Navegar a un artista aleatorio con un solo clic.

---

## Tecnologías utilizadas

| Herramienta | Versión | Uso |
|---|---|---|
| Vite | 8 | Scaffolding y bundler |
| React | 19 | Biblioteca de UI |
| React Router DOM | ^6.30 | Enrutamiento SPA |
| Context API | — | Estado global (favoritos y tema) |
| `useReducer` | — | Lógica de favoritos centralizada |
| PropTypes | ^15.8 | Validación de props en componentes |
| TheAudioDB API | v1 | Datos de artistas y álbumes |
| CSS puro | — | Estilos con variables CSS temáticas |
| Docker | — | Contenerización del entorno de desarrollo |
| Docker Compose | — | Orquestación del contenedor frontend |

---

## Estructura principal del repositorio

```txt
rock-pop-blog/
├── demo/
│   └── demo-routes.mp4          ← video de demostración
├── public/
├── src/
│   ├── components/
│   │   ├── AlbumCard.jsx        ← muestra portada, nombre y año de álbum
│   │   ├── ArtistCard.jsx       ← tarjeta reutilizable de artista
│   │   ├── ErrorMessage.jsx     ← mensaje de error genérico
│   │   ├── FavoriteButton.jsx   ← agrega/quita favorito con Context API
│   │   ├── FeatureCard.jsx      ← bloque visual en la página Home
│   │   ├── LoadingMessage.jsx   ← indicador de carga
│   │   ├── Navbar.jsx           ← barra de navegación con NavLink y toggle de tema
│   │   └── SearchBar.jsx        ← input controlado para búsqueda
│   ├── context/
│   │   ├── FavoritesContext.jsx ← Context API + useReducer para favoritos
│   │   └── ThemeContext.jsx     ← Context API + localStorage para tema
│   ├── data/
│   │   └── artists.js           ← datos base de 10 artistas (separados del componente)
│   ├── pages/
│   │   ├── Favorites.jsx        ← ruta /favorites
│   │   ├── Home.jsx             ← ruta /
│   │   ├── ItemDetail.jsx       ← ruta /items/:id con useParams
│   │   ├── Items.jsx            ← ruta /items con búsqueda y artista aleatorio
│   │   └── NotFound.jsx         ← ruta * (404)
│   ├── services/
│   │   └── audioDbApi.js        ← funciones fetch a TheAudioDB
│   ├── App.jsx                  ← BrowserRouter + Routes + useTheme
│   ├── index.css                ← variables CSS temáticas + animaciones
│   └── main.jsx                 ← providers ThemeProvider + FavoritesProvider
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Instalación local

**Requisitos previos:** Node.js 18 o superior.

```bash
# 1. Clonar el repositorio
git clone <URL-del-repositorio>
cd rock-pop-blog

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Abrir en el navegador: **http://localhost:5173**

---

## Variables de entorno

El archivo `.env.example` contiene la configuración mínima necesaria:

```
VITE_AUDIODB_KEY=123
```

La key `123` es pública y no requiere registro. El servicio de API tiene un fallback a `"123"` por si la variable no está definida.

El archivo `.env` está excluido del repositorio mediante `.gitignore`.

---

## Ejecución con Docker

El proyecto incluye `Dockerfile` y `docker-compose.yml` para ejecutar el entorno de desarrollo en un contenedor sin instalar Node.js localmente.

```bash
# Levantar el contenedor (construye la imagen en el primer uso)
docker compose up --build
```

Abrir en el navegador: **http://localhost:5173**

```bash
# Apagar el contenedor
docker compose down
```

El archivo `.dockerignore` excluye `node_modules`, `dist`, `.git` y archivos `.env`.

---

## Rutas disponibles

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Landing con hero, bloques de características y panel de vista previa |
| `/items` | `Items` | Listado de artistas con búsqueda en tiempo real y botón de artista aleatorio |
| `/items/:id` | `ItemDetail` | Detalle del artista: imagen, género, país, biografía, discografía y favorito |
| `/favorites` | `Favorites` | Lista de artistas guardados como favoritos con opción de limpiar |
| `*` | `NotFound` | Página 404 para cualquier ruta no reconocida |

---

## API utilizada

**TheAudioDB** — `https://www.theaudiodb.com/api/v1/json/{API_KEY}`

| Endpoint | Método | Uso |
|---|---|---|
| `/search.php?s={nombre}` | GET | Información del artista: imagen, género, país, biografía |
| `/searchalbum.php?s={nombre}` | GET | Lista de álbumes con portada y año de lanzamiento |

El servicio está encapsulado en `src/services/audioDbApi.js` con la función interna `request(endpoint)` que valida `response.ok` antes de retornar el JSON.

Los datos base de los artistas (id, nombre, género, país, descripción) viven en `src/data/artists.js` y no están hardcodeados dentro de ningún componente.

---

## Cómo funciona la aplicación

### Navegación

Toda la navegación interna utiliza `Link`, `NavLink` o `useNavigate` de React Router DOM v6. No se usa la etiqueta `<a>` para ningún enlace interno.

### Búsqueda

En `/items`, el estado del texto de búsqueda se maneja con `useState`. El filtro compara el texto contra `name`, `genre` y `country` de cada artista en tiempo real.

### Artista aleatorio

El botón "✨ Artista aleatorio" en `/items` selecciona un elemento al azar del array de artistas y navega programáticamente a `/items/:id` usando `useNavigate`.

### Detalle del artista

`ItemDetail` obtiene el `id` de la URL mediante `useParams`, busca el artista local correspondiente y consume la API de TheAudioDB con `Promise.all` para cargar imagen, biografía y álbumes en paralelo. Muestra `LoadingMessage` durante la carga y `ErrorMessage` si ocurre un error. Si el artista no existe localmente, muestra un mensaje de "Artista no encontrado".

### Favoritos

`FavoritesContext` implementa un `useReducer` con tres acciones:

| Acción | Efecto |
|---|---|
| `ADD_FAVORITE` | Agrega un artista a la lista (evita duplicados) |
| `REMOVE_FAVORITE` | Elimina un artista por id |
| `CLEAR_FAVORITES` | Vacía la lista completa |

Los hooks `useFavoritesState()` y `useFavoritesDispatch()` están disponibles en cualquier componente dentro de `FavoritesProvider`. Ambos hooks lanzan un error descriptivo si se usan fuera del Provider.

### Tema claro/oscuro

`ThemeContext` expone `theme` (`"dark"` o `"light"`) y `toggleTheme`. El tema se persiste en `localStorage` bajo la clave `rock-pop-theme`. El cambio se aplica añadiendo la clase `app--dark` o `app--light` al contenedor raíz de la aplicación, lo que activa el conjunto de variables CSS correspondiente sin manipulación directa del DOM.

---

## Componentes reutilizables

### ArtistCard

Muestra una tarjeta con nombre, género, país, descripción y enlace al detalle del artista.

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `artist.id` | `string` | ✓ | Identificador único |
| `artist.name` | `string` | ✓ | Nombre del artista |
| `artist.genre` | `string` | ✓ | Género musical |
| `artist.country` | `string` | ✓ | País de origen |
| `artist.description` | `string` | ✓ | Descripción breve |

### SearchBar

Input controlado para búsqueda en tiempo real.

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `value` | `string` | ✓ | Valor actual del campo |
| `onChange` | `func` | ✓ | Manejador del evento de cambio |

### AlbumCard

Muestra la portada, nombre y año de lanzamiento de un álbum.

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `album.idAlbum` | `string` | ✓ | Identificador del álbum |
| `album.strAlbum` | `string` | ✓ | Nombre del álbum |
| `album.strAlbumThumb` | `string` | — | URL de la portada |
| `album.intYearReleased` | `string` | — | Año de lanzamiento |

### FavoriteButton

Botón que agrega o quita un artista de favoritos según el estado del contexto.

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `artist` | `object` | ✓ | Objeto completo del artista (misma forma que en `ArtistCard`) |

Utiliza `useFavoritesState()` para leer el estado y `useFavoritesDispatch()` para emitir acciones.

### ErrorMessage

Muestra un mensaje de error con estilo visual consistente.

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `message` | `string` | ✓ | Texto del error a mostrar |

### FeatureCard

Bloque visual de características usado en la página Home.

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `icon` | `string` | ✓ | Emoji o carácter Unicode |
| `title` | `string` | ✓ | Título del bloque |
| `description` | `string` | ✓ | Descripción breve |

---

## Rúbrica de cumplimiento

### Requerimientos base ✓

- [x] Proyecto generado con `npm create vite@latest`
- [x] Uso de `react-router-dom` v6 (`@6.30.3`)
- [x] Rutas mínimas: `/`, `/items`, `/items/:id`
- [x] Datos de artistas separados en `src/data/artists.js` (no hardcodeados en componentes)
- [x] `useParams` en `ItemDetail` para leer el id de la URL
- [x] Navegación interna exclusivamente con `Link`, `NavLink` y `useNavigate`
- [x] README con instrucciones de instalación y ejecución
- [x] Video de demostración en `/demo/demo-routes.mp4`

### Nivel Junior ✓

- [x] Todos los requerimientos base cumplidos
- [x] La aplicación funciona y puede ser clonada y ejecutada

### Nivel Mid ✓

- [x] Página 404 para rutas no reconocidas (`*` → `NotFound`)
- [x] Búsqueda y filtro en el listado (por nombre, género y país)
- [x] Botón "Artista aleatorio" usando `useNavigate`
- [x] Componentes reutilizables con props documentadas en README

### Nivel Senior ✓

- [x] Estado global con Context API: `FavoritesContext` (favoritos con `useReducer`) y `ThemeContext` (tema claro/oscuro con `localStorage`)
- [x] PropTypes definidos en 6 componentes: `ArtistCard`, `SearchBar`, `AlbumCard`, `FavoriteButton`, `ErrorMessage`, `FeatureCard`
- [x] Consumo de API pública: TheAudioDB (imagen, biografía en inglés y discografía completa)

---

## Descuentos evitados

| Penalización | Estado |
|---|---|
| Uso de `<a>` para navegación interna (−20 pts c/u) | ✓ No se usa `<a>` en ningún archivo de `src/` |
| README vacío o sin instrucciones (−50 pts) | ✓ README completo en español |
| Sin video demo (−15 pts) | ✓ Video presente en `demo/demo-routes.mp4` |
| Datos hardcodeados dentro de componentes (−50 pts) | ✓ Datos únicamente en `src/data/artists.js` |
| `node_modules` commiteado (−200 pts) | ✓ Ignorado por `.gitignore` |

---

## Video de demostración

El video de demostración se encuentra en **`/demo/demo-routes.mp4`**.

El video muestra:

1. Ruta `/` — landing con hero, características y panel de vista previa
2. Ruta `/items` — grid de tarjetas de artistas
3. Filtro de búsqueda en tiempo real
4. Botón "Artista aleatorio" navegando a un detalle
5. Ruta `/items/:id` — imagen, género, país, biografía y álbumes cargados desde la API
6. Click en "Agregar a favoritos" y cambio visual del botón
7. Ruta `/favorites` — artista guardado visible con opción de limpiar
8. "Limpiar todos" — vuelta al empty state
9. Ruta inexistente — página 404
10. Cambio de tema claro/oscuro desde la Navbar
