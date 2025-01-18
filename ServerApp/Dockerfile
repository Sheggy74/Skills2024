# Используем базовый образ PHP с поддержкой Composer
FROM php:8.2-fpm

# Устанавливаем зависимости
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    libzip-dev \
    unzip \
    inetutils-ping

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo pdo_pgsql gd zip

# Устанавливаем Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Устанавливаем рабочую директорию
WORKDIR /var/www

# Копируем все файлы Laravel
COPY . .
RUN chmod -R 777 /var/www/
# Устанавливаем зависимости Laravel
RUN composer install --optimize-autoloader

# Настройка прав доступа
RUN chown -R www-data:www-data /var/www/ /var/www/storage /var/www/bootstrap/cache /var/www/vendor/

#RUN php artisan migrate

# Открываем порт
EXPOSE 8000
CMD ["php","artisan","serve", "--host=0.0.0.0", "--port=8000"]
#CMD ["dockerize", "-wait", "tcp://postgres:5432", "-timeout", "60s", "php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]



