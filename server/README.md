# Server Authentication

For Running App In Development Mode, You should have PostgreSQL(V13+) and NodeJS(V12+) Installed.

Follow below steps for running development server:

  * run `npm install` or `yarn install` for Installing Dependecies
  * Set your environment variables based on `.env.example` file located in root
  * After creating your database, run `npx prisma migrate --name init` for Postgres Migrations
  * Run `npm start` or `yarn start` to run development server
  * App is running on `PORT=3000` or whatever you've set on `.env` file
