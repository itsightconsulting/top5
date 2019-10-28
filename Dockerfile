FROM node:8

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# ARG PORT=5000
# ENV PORT=${PORT}
ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL info
ENV PORT 5000

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /app


CMD node index.js
EXPOSE 5000
