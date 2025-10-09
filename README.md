# Tarea 2 - Avisos de Adopción

Aplicación para **agregar y visualizar avisos de adopción** de forma dinámica, usando **Flask**, **SQLAlchemy**, **MySQL** y **filetype**.

- **Validaciones:** Todos los campos importantes se validan con `validate_aviso` para asegurar datos correctos antes de guardarlos.  
- **Contactos múltiples:** Cada aviso puede tener varios métodos de contacto, guardados de manera independiente en la base de datos.  
- **Relaciones en la base de datos:** Se manejan relaciones entre `Region`, `Comuna`, `AvisoAdopcion`, `Foto` y `ContactarPor`, con cascada al eliminar avisos para mantener integridad.  
- **Paginación:** Listados de avisos implementados con `limit` y `offset` para mejorar rendimiento y experiencia de usuario.  
- **Seguridad:** Uso de `secure_filename`, validaciones backend y constraints en la base de datos para garantizar integridad y proteger la aplicación.
