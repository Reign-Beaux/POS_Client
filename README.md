# Cliente para un punto de ventas

![Version](https://img.shields.io/badge/Version-Alpha-blue)
![Estado](https://img.shields.io/badge/Estado-En%20desarrollo-yellow)

> Breve descripción del proyecto y su propósito.

Cliente desarrollado usando React, Vite y PNPM.

> Estructura de src.

- **assets:** Se utiliza para almacenar archivos de recursos estáticos, como imágenes, iconos, fuentes y cualquier otro tipo de archivo necesario para el diseño y la presentación visual de la aplicación.
- **common:** Contiene todo lo que pueda ser reutilizado en el aplicativo (componentes, constantes, custom-hooks, dtos, models y utilities)
- **components:** Aquí definimos los componentes que van a ser utilizados en App.tsx.
- **pages:** Esta carpeta contiene las diferentes páginas del aplicativo.
- **redux:** El estado global del aplicativo se manipula mediante la biblioteca redux y aquí guardamos el store y sus slices.
- **theme:** Debido a que utilizamos 2 paletas de colores (claro y oscuro), aquí cuardamos sus propiedades utilizando las herramientas proporcionadas por Material UI.
- **utilities:** Contiene mpétodos que serán utilizados en App.tsx
- **App.tsx:** Archivo principal que maneja toda la estructura del aplicativo.
- **main.tsx:** Archivo el cual contiene a App.tsx y lo agrega al único html del aplicativo
- **router.tsx:** El manejo del paginado en nuestro aplicativo esta a cargo del react-router-dom y en este guadamos toda lo que requiere.

> Estructura de pages (cada página puede contener toda la estructura o solamente su contenedor principal todo depende de la complejidad de la página).
- **components:** Contiene los componentes utilizados en esta página.
- **context:** En caso que se requiera compartir información de la ágina entre sus componentes usilizamos el API Context de react.
- **styled-component:** Sirve para guardar los styled-components.
- **namePage.tsx(El nombre de este archivo depende del nombre de la página):** Este será el archivo que contenga todos los componentes de cáda pagina.
