import { MikroORM, Reference } from "@mikro-orm/core";
import { SchemaGenerator } from "@mikro-orm/knex";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import path from "path";
import { Conversation } from "./conversation";
import { Message } from "./message";
import { User } from "./user";

it("should insert", async () => {
  const config = {
    baseDir: path.resolve(__dirname),
    dbName: "test",
    entities: [Conversation, Message, User],
    type: "postgresql" as const,
    host: "localhost",
    port: 5432,
    user: "postgres",

    schema: "privateschema",
  };
  const orm = await MikroORM.init<PostgreSqlDriver>(config);
  await new SchemaGenerator(orm.em).ensureDatabase();
  await new SchemaGenerator(orm.em).dropSchema();
  await new SchemaGenerator(orm.em).createSchema();

  const user = new User();
  const recipient = new User();
  const conversation = new Conversation(user, recipient);

  const em = orm.em.fork();

  await em.persistAndFlush([user, recipient, conversation]);

  const _conversation = await em.findOneOrFail(Conversation, conversation.id, {
    populate: ["user", "recipient"],
  });
  expect(_conversation.user.isInitialized()).toBe(true);
  expect(_conversation.recipient.isInitialized()).toBe(true);

  const _em = em.fork();
  em.getReference(User, user.id);
  em.getReference(User, recipient.id);

  expect(_conversation.user.isInitialized()).toBe(true);
  expect(_conversation.recipient.isInitialized()).toBe(true);

  await orm.close();
});
