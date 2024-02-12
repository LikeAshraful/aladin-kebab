<p align="center"><a href="https://www.facebook.com/tuhin.bu/" target="_blank"><img src="./resources/assets/admin-assets/img/logo.png" width="400" alt="Laravel Logo"></a></p>

## About Laravel

bdtask is an innovative app that harnesses the power of OpenAI's API to perform a wide range of tasks. From generating human-like text to providing insightful recommendations, bdtask is an all-in-one solution for users looking to streamline their workflow and maximize their productivity.

-   Empowering your knowledge with <b>Skytrip.</b>
-   Discover the potential of AI with <b>Skytrip.</b>
-   Unlock the power of AI with <b>Skytrip.</b>
-   Your guide to mastering AI - <b>Skytrip.</b>
-   Experience the future of learning with <b>Skytrip.</b>
-   Transform your skills with <b>Skytrip.</b>
-   Empower your career with <b>Skytrip.</b>
-   Learn the skills of tomorrow with <b>Skytrip.</b>
-   Your personal AI tutor - <b>Skytrip.</b>
-   AI made easy with <b>Skytrip.</b>

# How To Install

## Step 1: Install Dependencies

Before installing the this project, we need to make sure that our system has all the required dependencies installed. We will need to install the following dependencies:

-   PHP 8.1 or higher
-   Composer
-   Node.js
-   NPM
-   git

## Step 2: Clone This app

To clone the app, following command:

```bash
git clone git@bitbucket.org:campus-management-system/trip_laravel.git
```

## Step 3: Go To project directory and composer install

-   first go to the project directory

```bash
cd trip_laravel
```

-   Then copy the .env.example file to .env

```bash
cp .env.example .env
```

-   Then install composer

```bash
composer install
```

-   Then install npm

```bash
npm install
```

## Step 4: Compiling asset and publish assets

-   To compiling npm asset run this command

```bash
npm run build
```

-   then publish assets

```bash
php artisan storage:link
```

## Step 5: Config your database and assine to .env file

```php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=bdtask
DB_USERNAME=root
DB_PASSWORD=
```

## Step 6: Config your google recaptcha

The first step is to create reCAPTCHA API keys. To do this, follow these steps:

-   Go to the Google reCAPTCHA admin <a href="https://www.google.com/recaptcha/">console</a>.
-   Sign in to your Google account if you haven't already done so.
-   Click on the "Create" button to create a new reCAPTCHA API key pair.
-   Select "reCAPTCHA v2" as the type of reCAPTCHA you want to use.
-   Enter a label for your reCAPTCHA key pair (e.g. "MyWebsite reCAPTCHA").
-   Add the domain name or IP address of your website in the "Domains" field.
-   Accept the reCAPTCHA Terms of Service and click on the "Submit" button.
-   After you submit the form, you will see the Site key and Secret key values that you will need to configure your reCAPTCHA.

### Then add those key to your .env file

```php
INVISIBLE_RECAPTCHA_SITEKEY='6LeOGLdadaUkAAAAAInNQSNiLNsvPWXFtfOvNzdN5rCi'
INVISIBLE_RECAPTCHA_SECRETKEY='6LeOdadaGLUkAAAAAK3pEgkOJrpuSuGIhrNYTKm8XGKR'
```

## Step 7: Now serve your application using php artisan serve command

```bash
 php artisan serve
```


