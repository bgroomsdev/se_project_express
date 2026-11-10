# WTWR (What to Wear?): Back End

The back end for the WTWR application, a weather-based clothing recommendation app. It is an Express server with a MongoDB database, a REST API, and JWT-based user authorization, deployed on a remote Linux VM behind nginx with HTTPS.

## Deployed Project

- Frontend: https://wtwrsub.okzk.com
- API: https://api.wtwrsub.okzk.com

## Links

- [Project pitch video](https://drive.google.com/file/d/1JhASO7OPIskYp7B0Rn9mB0iSfvV9SDrD/view?usp=sharing): a walkthrough of the project and some challenges I faced while building it.
- [Front-end repository](https://github.com/bgroomsdev/se_project_react)

## Features

- **Authentication**: sign up and sign in; passwords are hashed and a JWT is issued on sign in
- **Authorization**: protected routes require a valid token in the `Authorization` header
- **Users**: get and update the current user's profile (name and avatar)
- **Clothing items**: get all items, create an item, and delete an item (only the owner can delete)
- **Likes**: like and unlike an item, with no duplicate likes per user
- **Validation**: request validation and Mongoose schemas enforce required fields, length limits, valid weather types (hot, warm, cold), and valid URLs
- **Error handling**: a centralized handler with custom error classes (`BadRequestError` 400, `UnauthorizedError` 401, `ForbiddenError` 403, `NotFoundError` 404, `ConflictError` 409) returns consistent JSON errors in the form `{ "message": "..." }`; unexpected errors return 500 with a generic message so internal details are never exposed
- **Logging**: request and error logs

## API Routes

| Method | Route                  | Auth | Description                               |
| ------ | ---------------------- | ---- | ----------------------------------------- |
| POST   | `/signup`              | No   | Create a new user                         |
| POST   | `/signin`              | No   | Sign in and receive a JWT                 |
| GET    | `/items`               | No   | Get all clothing items                    |
| POST   | `/items`               | Yes  | Create a clothing item                    |
| DELETE | `/items/:itemId`       | Yes  | Delete an item you own                    |
| PUT    | `/items/:itemId/likes` | Yes  | Like an item                              |
| DELETE | `/items/:itemId/likes` | Yes  | Remove your like                          |
| GET    | `/users/me`            | Yes  | Get the current user                      |
| PATCH  | `/users/me`            | Yes  | Update the current user's name and avater |

## Technologies

- **Express**: web server and routing
- **MongoDB / Mongoose**: database and data models
- **bcryptjs**: password hashing
- **jsonwebtoken**: token-based authorization
- **dotenv**: loads environment variables from `.env`
- **cors**: cross-origin requests from the front end
- **celebrate / Joi**: request validation
- **validator**: URL and email validation
- **winston / express-winston**: request and error logging
- **ESLint** (Airbnb config) and **Prettier**: code quality and formatting
- **Nodemon**: automatic restarts during development
- **nginx**, **pm2**, and **Let's Encrypt (Certbot)**: reverse proxy, process management, and HTTPS on the VM

## Running the Project Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Make sure MongoDB is running locally. The server connects to `mongodb://127.0.0.1:27017/wtwr_db`.

3. Create a `.env` file in the project root:

   ```
   JWT_SECRET=your-secret-here
   ```

4. Start the server:

   `npm run start` launches the server.

   `npm run dev` launches the server with hot reload.

The server listens on port 3001 by default, or on the port set in the `PORT` environment variable.

## Deployment

The API runs on a Google Cloud VM. nginx proxies `api.wtwrsub.okzk.com` to the Node server on port 3001 and serves the front end's static files on `wtwrsub.okzk.com`. HTTPS certificates come from Let's Encrypt, and pm2 keeps the server running.
