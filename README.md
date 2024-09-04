## DEV
npm i -D typescript nodemon ts-node @types/express @types/node

## PROD
npm i express oracledb typeorm dotenv reflect-metadata

## TSC Config
npx tsc --init

## Cria migration
npm run  migration:generate

## Executa migration
npm run  migration:run

## Authentication 
npm i jsonwebtoken bcryptjs morgan  --save