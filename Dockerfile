FROM node:8

<<<<<<< HEAD
ENV NODE_ENV test
ENV NPM_CONFIG_LOGLEVEL error
ENV NODE_MODULES_CACHE true
ENV NODE_VERBOSE false
ENV PORT 5010

=======
ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL error
ENV NODE_MODULES_CACHE true
ENV NODE_VERBOSE false
# ENV PORT 5000
>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
ENV jwtsecret dev_s3cr3t
ENV cryptsecret dev_s3cr3t

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app

<<<<<<< HEAD
EXPOSE 5010
CMD [ "node", "dist/index.js" ]
=======
EXPOSE 5000
CMD [ "node", "dist/index.js" ]

>>>>>>> 4e23dc55017b6acda1fe6fa103bac8993f49b840
