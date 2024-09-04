## DEV
```diff
    npm i -D typescript nodemon ts-node @types/express @types/node
```
## PROD
```diff
    npm i express oracledb typeorm dotenv reflect-metadata
```
## TSC Config
```diff
    npx tsc --init
```
## Cria migration
```diff
    npm run  migration:generate
```
## Executa migration
```diff
    npm run  migration:run
```

## Authentication 
```diff
    npm i jsonwebtoken bcryptjs morgan  --save
```