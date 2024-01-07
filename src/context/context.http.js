import { z } from "zod";
import { Zodios } from "@zodios/core";

const URL = "https://epic-stream-api.netlify.app";

export const preview = z.object({
  id: z.string(),
  description: z.string(),
  title: z.string(),
  image: z.string(),
  genres: z.array(z.number()),
  seasons: z.number().optional(),
});

export const fullShow = z.object({
  id: z.string(),
  description: z.string(),
  title: z.string(),
  image: z.string(),
  genres: z.array(z.number()),
  seasons: z.array(
    z.object({
      id: z.string(),
      season: z.number(),
      episodes: z.array(
        z.object({
          id: z.string(),
          title: z.string(),
          episode: z.number(),
          description: z.string(),
          date: z.string(),
          image: z.string(),
          file: z.string(),
        })
      ),
    })
  ),
});

const instance = new Zodios(URL, [
  {
    method: "get",
    path: "/",
    alias: "getPreviews",
    response: z.array(preview),
  },
  {
    method: "get",
    path: "/show/:id",
    alias: "getFullShow",
    response: fullShow,
  },
]);

/**
 */
export const getPreviews = instance.getPreviews;

/**
 * @param {string} id
 */
export const getFullShow = instance.getFullShow;

/**
 * Takes the response from the `getFullShow` service and merges the nested
 * episodes in the seasons property it into an existing episodes list (generally
 * the one current in the store).
 *
 * Note that if the episodes do not exist in the target already then `progress`
 * and `favourited` will be set to their default starting values.
 *
 * @param {object} props
 * @param {string} props.episodes
 * @param {object} props.response
 */
export const updateEpisodes = (props) => {
  const { episodes, response } = props;
  const data = services.schemas.full.parse(response);

  const result = data.seasons.map(
    ({ episodesArray, season }) => {
      return episodesArray.map((inner) => {
        const { id } = inner;
        const progress = episodes[id]?.progress || 0;
        const favourited = episodes[id]?.favourited || null;

        return {
          ...inner,
          season,
          progress,
          favourited,
        };
      });
    }
  );

  return operations.isCollection(result.flat());
};
