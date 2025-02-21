import { db } from "@/db";
import { userInfos } from "@/db/schema";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";

export const runtime = "edge";
export const maxDuration = 59;

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  console.log(err);
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "Internal error" }, 500);
});

const routes = app.get("/users", async (c) => {
  const data = await db.select().from(userInfos);
  return c.json({ data });
});

export const GET = handle(app);
export const PUT = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
