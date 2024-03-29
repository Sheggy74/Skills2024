Для развертывания ПО необходим установленный Windows 10,  Apache v2.4+, PostgreSQL v15+ база данных, DBeaver любой версии, Google Chrome или Yandex Browser версии не менее 2024 года
Важно! Не должны быть заняты такие url ( другими проектами ):
- http://127.0.0.1:8000
- http://localhost
...\ - основной каталог проекта
### Устанавливаем PostgreSQL ( пароль: atom24, логин: atom24 )
...\OtherInstall\PostgreSql


### Настройка Apache
...\OtherInstall\Apache24
Скопировать каталог Apache24 на диск C.
**Если 80 порт занят службой IIS, отключите его используя команду командной строки `IISRESET /stop`

Обеспечить возможность использования файлов .htaccess следующим образом:
Заменить в конфигурации Apache , файл - conf/httpd.conf все вхождения «AllowOverride None» на «AllowOverride All». ( В нашем apache24 уже настроено )
Запускаем сервис apache от администратора C:\Apache24/bin/httpd.exe ( либо запустить как службу )

### Установка Yandex Browser / Google Chrome
...\OtherInstall\GoogleChromeStandaloneEnterprise64

### Добавляем путь к каталогу php в переменную среды  Path
каталог - ...\OtherInstall\PHP

### Развертывание БД

1. В файле .env (Инструкция по развертыванию/ServerApp/.env)  поменяйте подключение к базе данных, если требуется
 ``````
  DB_CONNECTION=pgsql
  DB_HOST=localhost
  DB_PORT=5432
  DB_DATABASE=postgres
  DB_USERNAME=atom24
  DB_PASSWORD=atom24
  DB_SCHEMA_NAME=atom24
	

- Создать базу данных atom24 
- Создать схему atom24 'create schema atom24'
- Назначить права 'alter schema atom24 owner to atom24'
- Добавить uuid расширение, если не установлено запросом `create extension if not exists "uuid-ossp"` --check query validity
- Создать роль atom24 скриптом `CREATE ROLE atom24 NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT LOGIN PASSWORD 'atom24'` или вручную
- Дать доступ пользователю и суперпользователю на схему скриптами `grant usage on schema atom24 to postgres`, `grant usage on schema atom24 to atom24`
- Запустить файл `Инструкция по развертыванию/ServerApp/createtable.bat` для запуска миграций 
- Проверить создались ли таблицы, если отсутствуют, то выполнить скрипты в папке `Инструкция по развертыванию/Scripts/` по порядку от первого и до последнего

### Устанавливаем DBeaver
...\OtherInstall\Dbeaver
Запускать при помощи dbeaver_run.bat
Создаем подключение к postgres - host: localhost log: atom24 pass: atom24 ( Не забудьте выбрать драйвер для postgres, при создании подключения! , лежит в каталоге drivers )


### Развертывание фронтенда

Скопировать скомпилированный проект из папки `Инструкция по развертыванию\ClientApp\dist` в корень сервера Apache 
(папка htdocs по умолчанию)

### Развертывание бэкенда

Запустить файл `Инструкция по развертыванию/ServerApp/startserv.bat` для запуска бэкенд-сервиса

### Начало использования

Проверить, что сервис Apache запущен

Перейти по ссылке http://localhost используя Yandex Browser или Chrome, ввести логин `admin`, пароль `admin` в окне авторизации и начать пользоваться системой
