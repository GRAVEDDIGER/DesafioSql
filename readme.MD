# FEAT SQL CoderHouse

## SCRIPTS
* npm run dev: Development mode
* npm run build: Compiles in the build folder
* npm tail: Starts Tailswind development mode

## DEPENDENCES
* Express
* Express HBS
* Socket-IO
* KNEX
* SQLITE 3
* Tailwind Css
* TypeScript

## Achitecture

The proyect architecture is based on layers. 
Index.ts handles the main configurations and start de server
The design suports routes versioning.
Inside each active version you will find the routes that simply call the functions stored in a controller class.
The controllers folder contains the controllers classes ejecuting the services needed and placing the actual response of the server.
Database folder contains the sqlite files that stores the server data.
Configurations folder, contains multiple files that simplify the configuration of several midlewares used in this proyect
The Views folder stores de handlebars layputs, partials and views of the server. The Fornt end was developed using Tailwind Css.


