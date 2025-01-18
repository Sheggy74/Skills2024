#!/bin/bash

# Функция для завершения работы с сообщением об ошибке
function error_exit {
    echo "$1" 1>&2
    exit 1
}

# Запуск docker-compose
echo "Starting Docker Compose..."
docker-compose up -d || error_exit "Failed to start Docker Compose."

# Ожидание готовности PostgreSQL
echo "Waiting for PostgreSQL to be ready..."
while ! docker exec laravel-app pg_isready -h postgres -p 5432 > /dev/null 2>&1; do
    echo "PostgreSQL is not ready yet. Retrying in 5 seconds..."
    sleep 5
done
echo "PostgreSQL is ready!"

# Выполнение миграций в Laravel
echo "Running Laravel migrations..."
docker exec laravel-app php artisan migrate --force || error_exit "Laravel migrations failed."

echo "All containers are up, and migrations are completed successfully."
