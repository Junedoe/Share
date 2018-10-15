# Share

Have you ever walked into your basement and realised that you have too much stuff?

There too good to throw them away but no good enough to sell?

That's when you can use Share.

Share. is a web application where you can give away things to people who might need them. The focus lies on a really nice and easy to use user experience.

You can try a demo on [Heroku](https://go-share.herokuapp.com)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

If you want to try the app locally you need have NodeJS and MongoDB installed on your computer (information on how to install Node [here](https://nodejs.org/en/download/) or [here](https://github.com/creationix/nvm#installation) and for MongoDB [here](https://docs.mongodb.com/manual/administration/install-community/).

### Installing

A step by step series of examples that tell you how to get a development env running

First you need to clone the project

```
$ git clone https://github.com/Junedoe/Share.git
```

Change your directory:

```
$ cd share
```

Install all the dependencies:

```
$ npm install
```

In order to run the application, you need to have two terminal windows opened (one for the backend and one for the frontend). On one run this command:

```
$ npm run dev:server
```

On the other this command:

```
$ npm run dev:client
```

## Files to add

You should have a `server/.env` file with the following values:

```
PORT=5000
CLOUDINARY_CLOUD_NAME= // -> Here your Cloudinary cloud name
CLOUDINARY_API_KEY= // -> Here your API Key
CLOUDINARY_API_SECRET= // -> Here your API secret key
MONGODB_URI=mongodb://localhost/share
```

To upload pictures of products you will need to to create an account on Cloudinary [here](https://cloudinary.com/users/register/free).

```
/*******************************************************
 * Copyright (C) 2018 Ojuna Faust
 *
 * This file is part of Share.
 *
 * Share can not be copied and/or distributed without the express
 * permission of the author Ojuna Faust.
 *******************************************************/
```
