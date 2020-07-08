export type JsonObject = {
  [ref: string]: any;
};

export const parseJson = (json: string) => JSON.parse(json) as JsonObject;
