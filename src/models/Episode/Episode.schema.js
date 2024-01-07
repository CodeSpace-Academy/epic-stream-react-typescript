// @ts-check

import { z } from "zod";
import { withDev, createArrayOperations } from "zod-dev";

// @ts-ignore
const isDev = import.meta.env.MODE !== "production";

/**
 *
 */
export const schema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  episode: z.number().min(1),
  season: z.number().min(1),
  date: z.number().min(0),
  image: z.string().url(),
  file: z.string().url(),
  progress: z.number().min(0).max(100),
  favourited: z.number().min(0).nullable(),
});

/**
 *
 */
export const isItem = (value) => {
  return withDev(schema, isDev).devParse(value);
};

/**
 *
 */
export const operations = createArrayOperations(
  isDev,
  schema
);

export default {
  schema,
  isItem,
  operations,
};
