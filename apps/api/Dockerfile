# apps/api/Dockerfile
FROM node:18

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build api

CMD ["node", "dist/apps/api/main.js"]
