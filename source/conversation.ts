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
import { User } from "./user";

@Entity()
export class Conversation {
  @PrimaryKey({ type: UuidType })
  id = v4();

  @Property()
  changed: Date;

  @ManyToOne({ entity: () => User, wrappedReference: true })
  user: IdentifiedReference<User>;

  @ManyToOne({ entity: () => User, wrappedReference: true })
  recipient: IdentifiedReference<User>;

  constructor(
    user: User | IdentifiedReference<User>,
    recipient: User | IdentifiedReference<User>
  ) {
    this.user = Reference.create(user);
    this.recipient = Reference.create(recipient);
    this.changed = new Date();
  }
}
