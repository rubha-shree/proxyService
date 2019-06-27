FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy source code
COPY . /usr/src/app/

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

#Expose the port number
EXPOSE 3000

CMD [ "npm", "start" ]