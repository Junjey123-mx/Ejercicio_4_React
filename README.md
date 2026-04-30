# Rock & Pop Archive

Mini-blog musical construido con Vite + React + React Router.

## Nivel seleccionado

Este proyecto apunta al **nivel Senior (100 puntos)**.

### Junior
- Proyecto generado con `npm create vite@latest`.
- Uso de React.
- Uso de React Router.
- Rutas mínimas: `/`, `/items`, `/items/:id`.
- Datos base separados en `src/data/artists.js`.
- Uso de `useParams` en la vista de detalle.
- Navegación con `Link` y `NavLink`, nunca con `<a>`.
- README con instrucciones.
- Video de demostración en `/demo`.

### Mid
- Página 404 para rutas no encontradas.
- Búsqueda/filtro en el listado.
- Botón de artista aleatorio usando `useNavigate`.
- Componentes reutilizables con props documentadas en README.

### Senior
- Estado global con Context API para favoritos.
- Al menos 3 componentes con PropTypes.
- Consumo de API pública: TheAudioDB.

---

## Instalación local

```bash
npm install
npm run dev
```

Abrir: http://localhost:5173

## Variables de entorno

Crear un archivo `.env` con base en `.env.example`:

```bash
cp .env.example .env
```

## Ejecución con Docker

```bash
docker compose up --build
```

Abrir: http://localhost:5173

Para apagar:

```bash
docker compose down
```

---

## Componentes reutilizables

### ArtistCard

Muestra una tarjeta de artista.

| Prop | Tipo | Descripción |
|---|---|---|
| `artist.id` | string | Identificador único del artista |
| `artist.name` | string | Nombre del artista |
| `artist.genre` | string | Género musical |
| `artist.description` | string | Descripción breve |

### SearchBar

Input controlado para búsqueda.

| Prop | Tipo | Descripción |
|---|---|---|
| `value` | string | Valor actual del input |
| `onChange` | function | Manejador del cambio |

### AlbumCard

Muestra la portada de un álbum.

| Prop | Tipo | Descripción |
|---|---|---|
| `album.strAlbum` | string | Nombre del álbum |
| `album.strAlbumThumb` | string | URL de la portada |
| `album.intYearReleased` | string | Año de lanzamiento |

### FavoriteButton

Permite agregar o quitar un artista de favoritos.

| Prop | Tipo | Descripción |
|---|---|---|
| `artist` | object | Objeto completo del artista |

---

## Demo

El video de demostración se encuentra en `/demo/demo-routes.mp4`.

El video muestra:

- Ruta `/`.
- Ruta `/items`.
- Filtro de búsqueda.
- Botón aleatorio.
- Ruta `/items/:id`.
- Agregar favorito.
- Ruta `/favorites`.
- Ruta 404.
