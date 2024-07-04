# Usa una imagen oficial de Node.js como base
FROM node:alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Usa la variable de entorno para el puerto o expone un valor por defecto
EXPOSE 5000

# Define el comando de inicio para la aplicación
CMD ["npm", "run", "start:prod"]
