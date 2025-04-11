import * as userSchema from "./user.schema";
import * as chatSchema from "./chat.schema";

export const schema = {
  ...userSchema,
  ...chatSchema,
};
