# xtracker-app

# XPrice - Xbox Game Price Tracker (PWA)

> ⚠️ **PROYECTO EN DESARROLLO ACTIVO (WORK IN PROGRESS)** ⚠️
> El proyecto se encuentra en fase de optimización de interfaz y flujos lógicos dinámicos, diseñado específicamente para ofrecer una experiencia de aplicación nativa en dispositivos móviles.

**XPrice** es una plataforma web optimizada para entornos móviles dedicada a rastrear ofertas de videojuegos dentro del ecosistema de Xbox. La aplicación permite a los usuarios monitorear descuentos en tiempo real, analizar históricos de precios mínimos y máximos, gestionar una lista de favoritos personalizada y simular sistemas de alertas de notificaciones mediante un entorno multi-divisa y soporte de tema oscuro.

---

## 🚀 Características Implementadas (Mobile-First Frontend)
- **Experiencia de App Móvil Nativa:** Interfaz totalmente optimizada en UX/UI para navegación móvil.
- **Control de Estados Dinámico:** Lógica modular para el manejo de pestañas de navegación (Inicio, Ofertas, Buscar, Lista, Perfil) sin recargas de página.
- **Adaptabilidad Multi-Divisa:** Soporte dinámico en la interfaz para alternar precios entre múltiples regiones (USD, MXN, EUR, ARS, BRL, COP, CLP).
- **Gestión de Favoritos y Alertas:** Interactividad completa para añadir/remover títulos de la lista de deseos y gestión de lectura de notificaciones simuladas.
- **Soporte Nativo de Temas:** Implementación nativa de *Dark/Light Mode* sincronizado automáticamente con las variables de estilo globales.
- **Vistas Modulares Avanzadas:** Despliegue de fichas técnicas detalladas de juegos utilizando hojas de contenido dinámicas (*Sheets* de interfaz).

---

## 🛠️ Stack Tecnológico
Para garantizar un rendimiento óptimo y una arquitectura escalable, se ha utilizado un estándar moderno de desarrollo:
- **Framework Principal:** Next.js 16 (App Router) & React 19
- **Lenguaje:** TypeScript 5.7
- **Estilos y Animaciones:** Tailwind CSS 4.2 & tw-animate-css
- **Componentes de Interfaz:** Radix UI Primitives (Accordion, Dialog, Select, Switch, Tabs, Popover) & Shadcn UI
- **Iconografía:** Lucide React
- **Librería de Gráficos (Historial de Precios):** Recharts 2.15
- **Manejo de Formularios y Validación:** React Hook Form & Zod

---

## 📂 Arquitectura del Proyecto
El código sigue un patrón modular limpio, estructurado para facilitar auditorías de código, mantenimiento y testing funcional (QA):
* `/app`: Enrutamiento y punto de entrada centralizado de la aplicación (`page.tsx`).
* `/components`: Componentes globales de navegación y maquetación (`StickyHeader`, `BottomNavigation`, `GameDetailSheet`).
* `/components/sections`: Módulos de contenido independientes para cada pestaña (Inicio, Ofertas, Buscar, Lista, Perfil).
* `/lib`: Definición de tipos TypeScript estricto (`types.ts`) y centralización de datos mockeados para pruebas (`mock-data.ts`).
* `/hooks`: Hooks personalizados para desacoplar la lógica de estado de los componentes visuales.

---

## 🗺️ Roadmap de Desarrollo (Plan de Evolución)

### 🔄 Fase 1: Consolidación de Interfaz e Interactividad (Actual - En Progreso)
* [x] Maquetación base y arquitectura modular de componentes.
* [x] Control de estados globales (Moneda, Tema claro/oscuro, Favoritos).
* [ ] Robustecer el set de datos simulados (*Mock Data*) para cubrir casos extremos en pruebas de rendimiento de la UI.

### 🲄 Fase 2: Persistencia y Automatización (Próximamente)
* [ ] Conexión a Base de Datos (Supabase) para persistencia real de usuarios, favoritos y configuraciones de alertas.
* [ ] Integración de scripts de automatización/web scraping para la extracción real y diaria de precios directo de la tienda de Xbox.

---

## ⚙️ Configuración para Ejecución en Desarrollo Local

Si deseas clonar este repositorio para explorar la interfaz, auditar el código o correr pruebas de forma local, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/sebascencio/xtracker-app.git](https://github.com/sebascencio/xtracker-app.git)
   cd xtracker-app
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   # o alternativamente: npm install
   ```

3. **Levantar el servidor de desarrollo local:**
   ```bash
   pnpm dev
   # o alternativamente: npm run dev
   ```

4. **Visualizar la aplicación:**
   Abre http://localhost:3000 en tu navegador web. **Se recomienda activar la vista de dispositivo movil en el dev tools.** 
