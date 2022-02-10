import {
  AnyEntity,
  AssignOptions,
  BaseEntity,
  Entity,
  EntityAssigner,
  EntityData,
  EntityDTO,
  PrimaryKey,
  Reference,
  UuidType,
} from "@mikro-orm/core";

export class CoreEntityLike {
  id!: string;
}

@Entity()
export class CoreEntity {
  @PrimaryKey({ type: UuidType })
  id = "id";
}
