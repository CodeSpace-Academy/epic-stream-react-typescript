import { Component } from "./EpisodePreview";
import * as Episode from "../../models/Episode";

export default {
  title: "components/EpisodePreview",
  component: Component,
};

console.log(Episode.__mocking__.item());

export const Basic = () => <Component />;
