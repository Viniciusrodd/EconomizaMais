
# ==============================
# stage 1 - build
# ==============================
FROM node:22-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend .
COPY shared ../shared
RUN npm run build


# ==============================
# stage 2 - Nginx
# ==============================
FROM nginx:alpine

# remove default page
RUN rm -rf /usr/share/nginx/html/*

# nginx config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# build copy
COPY --from=builder /app/dist /usr/share/nginx/html

# default nginx port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]