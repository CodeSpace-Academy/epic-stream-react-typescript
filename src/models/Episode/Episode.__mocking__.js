// @ts-check

import { schema } from "./Episode.schema";
import { generateMock } from "@anatine/zod-mock";

const generate = () => generateMock(schema);
export const item = () => generate();

export default {
  item,
};
