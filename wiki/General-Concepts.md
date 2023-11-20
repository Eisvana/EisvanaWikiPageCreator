+## HTML
El cuerpo de la página siempre comienza con un div contenedor.

El primer elemento en ese contenedor es `<nav>`, así como los elementos `<h1>` y `<dialog>`.

El elemento `<main>` es un elemento `main.columns`, que tiene dos elementos `div.column`.

El de la izquierda tiene una única `div.table`, con otros elementos `<div>` que agregan funcionalidad como galería o botones de acción.

El de la derecha solo tiene hijos `div.wikitext`, que luego contienen el wikitext real.

Aquí hay una tabla que visualiza la estructura:

| Izquierda | Derecha |
|-----------|--------------|
| tabla.div | div.wikitexto |

Cualquier dato que esté directamente relacionado con la entrada del usuario debe incluirse en un elemento de "salida", idealmente con atributos de identificación o nombre. El atributo "nombre" distribuye automáticamente datos a todos los elementos de salida con el mismo nombre.