--скачать php
https://www.php.net/downloads.php
--скачать композер
https://getcomposer.org/download/
--конфиг: 
extension=openssl
extension=pgsql
extension=pdo_pgsql

composer ssl/tls open:
composer config -g -- disable-tls false
update:
composer install --ignore-platform-reqs

php artisan migrate:fresh —seed

--отправка на почту
http://127.0.0.1:8000/api/message/post