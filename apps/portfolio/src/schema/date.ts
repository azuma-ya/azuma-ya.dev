import { isValid, parse } from "date-fns";
import { z } from "zod";

// "YYYY-M-D" の形式を正規表現で検証
export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{1,2}-\d{1,2}$/, "日付の形式が正しくない")
  .transform((val) => {
    const parsedDate = parse(val, "yyyy-M-d", new Date());
    if (!isValid(parsedDate)) {
      throw new Error("無効な日付");
    }
    return parsedDate;
  });
