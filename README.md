# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

## Technologies

- **Express**: web server and routing
- **MongoDB / Mongoose**: database and data models
- **validator**: URL validation for avatar and image fields
- **ESLint** with the Airbnb config: code quality and style
- **Prettier**: code formatting
- **Nodemon**: automatic server restarts during development

## Features

- **Users**: create a user, get all users, and get a user by ID
- **Clothing items**: create an item, get all items, and delete an item by ID
- **Likes**: like and unlike an item, with no duplicate likes per user
- **Error handling**: consistent JSON error messages for invalid data (400), missing resources (404), and server errors (500)
- **Data validation**: Mongoose schemas enforce required fields, length limits, valid weather types (hot, warm, cold), and valid URLs
- **Temporary authorization**: a placeholder middleware attaches a test user to each request until real authentication is added
