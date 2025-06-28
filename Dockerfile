# Étape de build Angular
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build -- --configuration=production

# Étape de production avec NGINX
FROM nginx:1.27-alpine

COPY --from=builder /app/dist/angular-tailwind /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]