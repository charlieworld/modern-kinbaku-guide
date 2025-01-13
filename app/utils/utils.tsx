import {
  DEFAULT_TITLE,
  META_DESC,
  META_IMAGE,
  ROOT_META,
  WEBSITE,
} from "./constants";

export function getMeta({
  title = DEFAULT_TITLE,
  description = META_DESC,
  image = META_IMAGE,
  url = WEBSITE,
}) {
  return [
    { name: "title", content: title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:url", content: url },
    { property: "version", content: ROOT_META.version },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: image },
  ];
}


export function replaceN2br(str: string) {
  if (!str) return '';
  return `${str}`.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>');
}