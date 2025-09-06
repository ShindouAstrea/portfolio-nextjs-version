## Proyecto de next js

Porfolio creado en nextjs , dockerizado y con conexion a supabase

## DEV
Para desarrollo local ejecutar
1. Target local
```
docker build -t web_portfolio-dev --target dev ./
```
2.- Ejecutar la imagen
```
docker run -it -p 3000:3000 -v "$(pwd):/app" -v /app/node_modules web_portfolio-dev
```

3.- Luego de realizar esos procesos de ahora en adelante en fase de desarrollo ejecutar:
```
docker compose up --build
```
y  imagen para produccion 
```
docker compose -f docker-compose.yml up --build -d
```

