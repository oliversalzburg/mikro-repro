import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { CoreEntity } from "./entity";

it("should insert", async () => {
  const config = {
    baseDir: path.resolve(__dirname),
    debug: true,
    dbName: "test",
    entities: [CoreEntity],
    type: "postgresql" as const,
    host: "localhost",
    port: 5432,
    user: "postgres",

    schema: "privateschema",
  };
  const orm = await MikroORM.init(config);
  const entity = new CoreEntity();
  await expect(orm.em.fork().persistAndFlush(entity)).rejects.toThrow(
    /insert into "privateschema"."core_entity" ("id") values ('.+') returning "id" - relation "privateschema"."core_entity" does not exist/
  );
});
