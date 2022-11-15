# backend-template-express-sequelize

ES6 Boilerplate for express/sequelize app

1. clone repo into desired local directory
2. npm i
3. open `node_modules/sequelize-cli/lib/assets/models/model.js`
4. change require syntax to import
5. PascalCase name => Name in `class <%= name %>`, `<%= name %>.init` and `return <%= name %>`
6. create Postgres db. run following command in terminal:
   ```javascript
   docker run --name postgres-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
   ```

<!-- Command explaination -->

- Last section of the command grabs the latest 'postgres' Docker image from the Docker Hub
- -d means that you enable Docker to run the container in the background
- -p plus the port numbers means you map the containers port 5432 to the external port 5432 - this allows you to connect to it from the outside
- POSTGRES_PASSWORD sets the password to docker. This is the password that gives you access to your database
- the --name property gives your container a name and means you can easily find it back
- more info: https://dev.to/andre347/how-to-easily-create-a-postgres-database-in-docker-4moj

<!-- End command explaination -->

7. insert same --name and POSTGRES_PASSWORD values into `.env` file
8. `npx sequelize db:create` -> `model:generate --name tester --attributes test:string --underscored`
9. ensure the model generated is in ES6 format i.e. using import/export default syntax as well as PascalCase class names, lowercased model name. (compare files to example test files if unsure)
10. change all migrations/seeders files to `.cjs` extension
