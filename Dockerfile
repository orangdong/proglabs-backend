FROM node:16.15

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY db ./db/

RUN npm install
RUN npx prisma generate

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "node", "src/index.js" ]