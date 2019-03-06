# Vue Gallery Server

Vue Gallery Server - это Node.js сервер, разработанный для поддержки Front-end части галереи [VueGallery](https://github.com/Lavrend/vue-gallery)

## Стэк технологий

* [Babel](https://babeljs.io/)
* [Node.js](https://nodejs.org)
* [Express](http://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Webpack](https://webpack.js.org/)
* [Heroku](https://www.heroku.com/) - для деплоя и хостинга

## Установка

Для работы необходим [Node.js](https://nodejs.org/) и менеджер пакетов ([npm](https://www.npmjs.com/) или [yarn](https://yarnpkg.com/))

* Node.js - v10.14.2
* yarn - v1.12.3

А также менеджер базы данных MongoDB, можно воспользоваться [MongoDB.Atlas](https://www.mongodb.com/cloud/atlas) либо [развернуть локально](https://docs.mongodb.com/manual/)

### 1. Установка зависимостей

```sh
cd vue-gallery-server
yarn install
```

### 2. Импортирование дампа MongoDB

Пример MongoDB.Atlas:

```sh
mongorestore --host <DB_HOST> --ssl --username <USER> --password <PASSWORD> --authenticationDatabase admin db_dump
```

Либо создать вручную коллекцию `tiles`, и вставить несколько записей, вида:

* `_id: <ObjectId>` - уникальный id (генерируется автоматически)
* `type: <String>` - задает тип плитки в галерее (`"normal|double"`)
* `title: <String>` - название изображения (заголовок)
* `description: <String>` - краткое описание (необходим для предпросмотра, автоматически обрезается)
* `text: <String>` - полное описание изображение (поддерживается HTML разметка)

### 3. Подготовка окружения

Необходимо добавить файл окружения `.env`

```sh
cp -i .env.example .env
```

После чего, необходимо поменять переменную `DB_HOST` для подключения к MongoDB

### 4. Запуск (локально)

```sh
yarn start
```

### 5. Сборка и деплой

Для деплоя используется облачный сервис Heroku - [Документация Heroku + Node.js](https://devcenter.heroku.com/categories/nodejs-support)

//TODO
