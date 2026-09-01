import json from "../../../../public/content/profile/info.json";
import { infoSchema } from "../types/info";

export const getInfo = () => {
  const info = infoSchema.parse(json);
  return info;
};
