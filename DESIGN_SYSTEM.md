# Sistema de Diseño Nexo

## 🎨 Colores Personalizados

Los colores de Nexo están disponibles en Tailwind CSS:

```jsx
// Naranja principal de Nexo
<div className="bg-nexo-orange text-white">
  Contenido
</div>

// Gris oscuro de Nexo
<div className="bg-nexo-dark">
  Contenido
</div>

// Gris medio
<div className="text-nexo-gray">
  Texto gris
</div>

// Gris claro
<div className="bg-nexo-light-gray">
  Fondo claro
</div>
```

### Valores de colores:
- `nexo-orange`: #E94F1D
- `nexo-dark`: #1E1E1E
- `nexo-gray`: #99A1AF
- `nexo-light-gray`: #E5E7EB

## 🔤 Fuentes Personalizadas

### Druk Wide (Para títulos y headings)

```jsx
// Usando la clase de Tailwind
<h1 className="font-heading text-4xl font-bold">
  Título Principal
</h1>

// O usando font-weight directamente
<h2 className="font-['Druk_Wide'] font-medium">
  Título Medio (500)
</h2>

<h3 className="font-['Druk_Wide'] font-bold">
  Título Bold (700)
</h3>

<h4 className="font-['Druk_Wide'] font-extrabold">
  Título Super (800)
</h4>

<h5 className="font-['Druk_Wide'] font-black">
  Título Heavy (900)
</h5>
```

### PP Mori (Para texto de cuerpo)

```jsx
// Usando la clase de Tailwind
<p className="font-body">
  Texto de párrafo normal
</p>

// O usando font-weight directamente
<p className="font-['PP_Mori'] font-extralight">
  Texto extra ligero (200)
</p>

<p className="font-['PP_Mori'] font-normal">
  Texto regular (400)
</p>

<p className="font-['PP_Mori'] font-semibold">
  Texto semi-bold (600)
</p>

// Con itálica
<p className="font-['PP_Mori'] font-normal italic">
  Texto en itálica
</p>
```

## 📱 Breakpoints Personalizados

Los breakpoints están configurados en `tailwind.config.js`:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

```jsx
// Ejemplo de uso responsive
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  Texto responsive
</div>

// Ocultar en móvil, mostrar en desktop
<div className="hidden lg:block">
  Contenido desktop
</div>

// Mostrar en móvil, ocultar en desktop
<div className="block lg:hidden">
  Contenido móvil
</div>
```

## 🚀 Ejemplos Completos

### Hero Section
```jsx
<section className="bg-nexo-dark py-20">
  <h1 className="font-heading text-5xl font-black text-nexo-orange">
    NEXO CrossFit
  </h1>
  <p className="font-body text-lg text-nexo-light-gray mt-4">
    Tu mejor versión te espera
  </p>
</section>
```

### Card Component
```jsx
<div className="bg-white rounded-lg p-6 shadow-lg">
  <h3 className="font-heading text-2xl font-bold text-nexo-dark">
    Título de Card
  </h3>
  <p className="font-body text-nexo-gray mt-2">
    Descripción del contenido
  </p>
  <button className="bg-nexo-orange text-white font-body font-semibold px-6 py-3 rounded-lg mt-4 hover:opacity-90">
    Ver más
  </button>
</div>
```

## 📁 Estructura de Archivos

```
nexo-web/
├── tailwind.config.js      # Configuración de Tailwind (colores, fuentes, breakpoints)
├── public/
│   └── fonts/              # Fuentes personalizadas
│       ├── DrukWide-*.otf
│       └── PPMori-*.otf
└── app/
    └── globals.css         # Declaraciones @font-face y estilos globales
```

### ¿Qué va en cada archivo?

**`tailwind.config.js`**:
- Colores personalizados
- Familias de fuentes (referencias)
- Breakpoints
- Extensiones de tema de Tailwind

**`app/globals.css`**:
- Declaraciones `@font-face` (carga de archivos de fuentes)
- Estilos globales del body
- Import de Tailwind CSS

## ✅ Todo está listo!

Las fuentes y colores ya están configurados. Solo usa las clases de Tailwind en tus componentes.
