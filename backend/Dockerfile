
# ==============================
# stage 1 - build
# ==============================
FROM node:22-alpine AS builder
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci
COPY backend .
COPY shared ../shared
RUN npm run build


# ==============================
# stage 2 - run
# ==============================
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY backend/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
RUN mkdir -p /app/temp/pdf
EXPOSE 5225
CMD ["node", "dist/app.js"]