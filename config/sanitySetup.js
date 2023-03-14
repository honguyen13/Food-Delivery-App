import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url'
import {PROJECT_ID, DATASET, USECDN, API_VERSION} from "@env"

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  useCdn: USECDN,
  apiVersion: API_VERSION,
});

const projectId = PROJECT_ID;
const dataset = DATASET;
const useCdn = USECDN;
const apiVersion = API_VERSION;

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source);


export const getPosts = async (querry) =>
  await fetch(
    `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${querry}`
  )
    .then((res) => res.json())
    .then((resJson) => resJson.result);