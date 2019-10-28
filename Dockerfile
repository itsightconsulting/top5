FROM node:8

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# ARG PORT=5080
# ENV PORT=${PORT}

# Crear directorio de aplicaciones
WORKDIR /usr/src/app

# Instalar dependencias de aplicaciones
# Se utiliza un comodín para garantizar que se copien package.json Y package-lock.json
# donde esté disponible (npm @ 5 +)
COPY package*.json ./

RUN npm install
RUN npm build
# Si está construyendo su código para producción
# RUN npm ci --only = production

# Fuente de la aplicación del paquete
COPY . .

# Su aplicación se une al puerto 8080, 
# por lo que usará la instrucción EXPOSE para que el docker demonio la asigne:
EXPOSE 8080

CMD [ "npm", "run","start" ]