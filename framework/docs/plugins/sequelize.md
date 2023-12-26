# Enabling Sequelize ORMs middleware

### 1.0 Required packages:
Please install the following packages:
```sh
yarn add pg pg-hstore # for postgres
yarn add sequelize umzug # core
yarn add pagination sequelize-cursor-pagination # pagination utils
```
Typescript definitions as dev dependencies:
```sh
yarn add -d @types/sequelize 
```

### 1.1 Node scripts:
Please add the following tasks to your `package.json`'s *scripts* section: 
```json
{
  "sequelize:migrate": "node framework/db/sequelize/cli/migrate",
  "sequelize:seed": "node framework/db/sequelize/cli/seed"
}
```