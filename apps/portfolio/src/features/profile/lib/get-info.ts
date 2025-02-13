import { infoSchema } from "../types/info";

import json from "../../../../public/content/profile/info.json";

export const getInfo = () => {
  const info = infoSchema.parse(json);
  return info;
};
