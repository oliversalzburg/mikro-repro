```shell
yarn tsc --build
yarn mikro-orm schema:create --run

# Show virtualized copies
yarn info -AR --virtuals @mikro-orm/knex
```