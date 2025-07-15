# apps/website/Dockerfile
FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build website

# Serve la build con nginx
FROM nginx:alpine

COPY --from=builder /app/dist/apps/website /usr/share/nginx/html

EXPOSE 80
