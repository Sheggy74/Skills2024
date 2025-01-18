@echo off

REM Запуск docker-compose
echo Starting Docker Compose...
docker-compose up -d
if %ERRORLEVEL% neq 0 (
    echo Failed to start Docker Compose.
    exit /b 1
)

REM Ожидание готовности PostgreSQL
echo Waiting for PostgreSQL to be ready...
:WAIT_FOR_POSTGRES
docker exec -t laravel-container ping -c 5 postgres
if %ERRORLEVEL% neq 0 (
    timeout /t 5 >nul
    goto WAIT_FOR_POSTGRES
)

REM Выполнение миграций в Laravel
echo Running Laravel migrations...
docker exec -t laravel-container php artisan migrate:fresh
if %ERRORLEVEL% neq 0 (
    echo Laravel migrations failed.
    exit /b 1
)

REM Первоначальное заполнение бд в Laravel
echo Running Laravel seeding...
docker exec -t laravel-container php artisan db:seed
if %ERRORLEVEL% neq 0 (
    echo Laravel seed failed.
    exit /b 1
)

echo All containers are up, and migrations are completed successfully.
exit /b 0
