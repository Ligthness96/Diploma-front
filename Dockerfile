FROM node:18 as build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы из текущего каталога в контейнер
COPY . .

# Собираем React-приложение
RUN npm run build

# Создаем production-ready образ Nginx
FROM nginx:alpine

# Копируем собранные файлы React-приложения из предыдущего этапа в каталог Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

# Команда для запуска Nginx при старте контейнера
CMD ["nginx", "-g", "daemon off;"]
