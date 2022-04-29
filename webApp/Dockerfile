# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# install app dependencies
COPY webApp/package.json ./
RUN npm install

# add app
COPY webApp/. .

# start app
CMD ["npm", "start"]