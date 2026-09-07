# Stage 1: Build Frontend Assets (Inertia/Vite)
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production PHP + Nginx Environment
FROM php:8.2-fpm-alpine

# Install system dependencies & PHP extensions for Laravel & PostgreSQL (Supabase)
RUN apk add --no-cache \
    nginx \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    curl \
    && docker-php-ext-install pdo pdo_pgsql pgsql zip opcache

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy project files
COPY . .

# Copy built assets from frontend stage
COPY --from=frontend /app/public/build ./public/build

# Install backend dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Set permissions for storage & bootstrap cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Copy deployment start script
COPY docker/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

EXPOSE 80

CMD ["/usr/local/bin/start.sh"]