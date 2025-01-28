#!/bin/bash

# Функция для завершения работы с сообщением об ошибке
function error_exit {
    echo "$1" 1>&2
    exit 1
}

# Запуск docker-compose
echo "Starting Docker Compose..."
docker-compose up -d --build|| error_exit "Failed to start Docker Compose."

# Ожидание готовности PostgreSQL
echo "Waiting for PostgreSQL to be ready..."
docker exec laravel-container ping -c 5 postgres 
echo "PostgreSQL is ready!"

# Выполнение миграций в Laravel
echo "Running Laravel migrations..."
docker exec laravel-container php artisan migrate:fresh || error_exit "Laravel migrations failed."
docker exec laravel-container php artisan db:seed || error_exit "Laravel seeding failed."

echo "All containers are up, and migrations are completed successfully."
