// lib/sanity.js
import {
  createClient,
  createPreviewSubscriptionHook,
  createImageUrlBuilder,
  createPortableTextComponent,
} from "next-sanity";
// import createImageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: "elmicmwr",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false,
};

export const sanityClient = createClient(config);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const PortableText = createPortableTextComponent({
    ...config,
    serializers: {}
});
