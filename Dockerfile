FROM debian
RUN apt-get update
RUN apt-get install -y nodejs npm
COPY . /app
WORKDIR /app
RUN npm install
CMD ["node", "server.js"]