import { Entity, PrimaryKey, UuidType } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity()
export class User {
  @PrimaryKey({ type: UuidType })
  id = v4();
}
