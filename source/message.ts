import {
  Entity,
  IdentifiedReference,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
  Reference,
  UuidType,
} from "@mikro-orm/core";
import { v4 } from "uuid";
import { Conversation } from "./conversation";
import { User } from "./user";

@Entity()
export class Message {
  @PrimaryKey({ type: UuidType })
  id = v4();

  @ManyToOne({ entity: () => Conversation, wrappedReference: true })
  conversation!: IdentifiedReference<Conversation>;

  @ManyToOne({ entity: () => User, wrappedReference: true })
  author!: IdentifiedReference<User>;

  constructor(
    conversation: Conversation | IdentifiedReference<Conversation>,
    author: User | IdentifiedReference<User>
  ) {
    this.conversation = Reference.create(conversation);
    this.author = Reference.create(author);
  }
}
