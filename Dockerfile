FROM node:8

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PORT=5080
ENV PORT=${PORT}

# -e "NODE_ENV=production"
# -e "PORT=5000"


# Create app directory
WORKDIR /usr/src

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]