# Laredu
Plataforma escolar con **Laravel 11** (backend) y **React 19** 
(frontend).
## Requisitos
- PHP ^8.2
- Composer
- Node.js & npm
- MySQL
## Instalación del Backend (Laravel 11)
1. Ir a la carpeta `backend`
2. Copiar `.env.example` a `.env` y configurar la base de datos
3. Ejecutar:
 composer install
 php artisan key:generate
 php artisan migrate --seed
 php artisan serve
4. El backend estará disponible en http://127.0.0.1:8000
Archivo SQL
• En backend/database/laredu.sql se encuentra el backup de 
la base de datos.
• En el servidor se puedes importarlo manualmente con:
mysql -u user -p laredu < laredu.sql
Postman Collection
• Importar docs/Laredu.postman_collection.json en Postman 
para probar los endpoints.
Licencia
• MIT (ejemplo)
## 7. Subir Todo a GitHub
1. Asegúrate de que tu `.gitignore` **ignore** `vendor/` 
(Laravel), `node_modules/` (React) y `.env`.
2. Añade `frontend/` y `backend/` al repositorio.
3. Haz commit y push:
 git add .
 git commit -m "Add backend and frontend"
 git push
En GitHub, verás tu carpeta laredu con subcarpetas backend y 
frontend, junto a README.md.