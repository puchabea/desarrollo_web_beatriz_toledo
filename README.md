# Tarea 3 – Gráficos y Comentarios

Aplicación web para **agregar comentarios y visualizar gráficos de forma asíncrona y dinámica**, utilizando principalmente **AJAX** y **JavaScript**.

## Gráficos

- Implementé **tres estadísticas distintas**, cada una desarrollada **de manera independiente** con **JavaScript**.
- Los datos se obtienen mediante **peticiones asincrónicas (AJAX)** al servidor Flask.
- En **`app.py`** agregué rutas dedicadas que envían los datos en formato **JSON**, para que puedan ser procesados directamente por el front-end.
- Los gráficos se renderizan dinámicamente en el navegador, y los **datos se actualizan automáticamente al cargar la página**, mostrando siempre la información más reciente.


## Comentarios

- Creé un archivo **`comentario.js`** exclusivo para manejar la funcionalidad de los comentarios.
- Modifiqué el **HTML** para incluir un formulario de entrada y un contenedor donde se muestran los comentarios.
- Los comentarios se envían y cargan de manera **asíncrona**, sin necesidad de recargar la página.
- Antes de enviarse, **los datos son validados** en el cliente (nombre, texto, longitud mínima, etc.).
- También se implementó **manejo de errores en JavaScript**, mostrando mensajes claros en pantalla cuando los datos son inválidos o la solicitud falla.


## Funcionalidad general

La aplicación integra tanto visualización dinámica de datos como interacción del usuario:
- Los gráficos se generan automáticamente y se actualizan sin recargar la página.
- Los comentarios se validan y agregan en tiempo real.

