// @ts-check

import { format as formatDate } from "date-fns";
import { operations } from "./Episode.schema";

/**
 * Determines (based on ID) whether a specific episode is currently favourited.
 *
 * @param {object} props
 * @param {string} props.id
 * @param {object[]} props.episodes
 * @returns {boolean}
 */
export const calcIfFav = (props) => {
  const { episodes, id } = props;
  const [{ favourited }] = operations.get(episodes, id);
  return Boolean(favourited);
};

/**
 * Get the date when a specific episode was favourited.
 *
 * @param {object} props
 * @param {string} props.id
 * @param {object[]} props.episodes
 * @returns {Date}
 */
export const getFavDate = (props) => {
  const { episodes, id } = props;
  const [{ favourited }] = operations.get(episodes, id);

  if (!favourited) {
    throw new Error(`Episode ${id} is not favourited`);
  }

  const date = new Date(favourited);
  return date;
};

/**
 * Get the date when a specific episode was favourited, however it is returned
 * as string value instead of a date.
 *
 * @param {object} props
 * @param {string} props.id
 * @param {object[]} props.episodes
 * @returns {string}
 */
export const getFavDateAsString = (props) => {
  const date = getFavDate(props);
  return formatDate(date, "dd MMM yyyy");
};

/**
 * Adds a new favourited episode to the front of the current favourites list.
 * Accepts a Unix timestamp value of the time of favouriting (generally the
 * current `Date.now` time)
 *
 * A quality of life wrapper around `add` and `remove` that will take the
 * required action based on whether the targeted item is already favourited or
 * not.
 *
 * @param {object} props
 * @param {string} props.id
 * @param {object} props.episodes
 * @param {number} props.timestamp
 * @param {'remove' | 'add'} [props.action]
 */
export const toggleFavourite = (props) => {
  const { episodes, id, timestamp, action } = props;

  const inner =
    action || calcIfFav({ episodes, id })
      ? "remove"
      : "add";

  const result = operations.update(episodes, (episode) => {
    if (episode.id !== id) return episode;

    if (inner === "remove") {
      if (!episode.favourited)
        throw new Error(`Episode ${id} is not favourited`);

      return {
        ...episode,
        favourited: null,
      };
    }

    return {
      ...episode,
      favourited: timestamp,
    };
  });

  return result;
};
