# Server

## Intrucciones para ejecutar

1. Instalar las dependencias

    ```bash
    npm install
    ```

2. Crear un archivo `.env` siguiendo los requisitos en el archivo `.env.example`:
    - Agregar la string de conexión de Mongo en `DATABASE_URL`

3. Iniciar el servidor

    ```bash
    npm run dev
    ```

### Actualización del esquema de mongo

Si se hacen cambios en el esquema de la base de datos (archivos en `prisma/`), se tiene que ejecutar el comando:

```bash
npx prisma generate
```
