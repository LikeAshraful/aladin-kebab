#!/bin/sh

# Move nginx config
cp /var/www/html/docker/nginx.conf /etc/nginx/http.d/default.conf

# Cache optimizations & migrations
php artisan storage:link || true
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force

# Start PHP-FPM in background and Nginx in foreground
php-fpm -D
exec nginx -g "daemon off;"