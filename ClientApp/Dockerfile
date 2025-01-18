# Используем базовый образ для Angular
FROM node:18 as build-stage

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --force

# Копируем исходный код
COPY . .


# Сборка приложения
RUN npm run build --prod

# Используем Nginx для статических файлов
FROM nginx:alpine as production-stage
COPY --from=build-stage /usr/src/app/dist/client-app /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
