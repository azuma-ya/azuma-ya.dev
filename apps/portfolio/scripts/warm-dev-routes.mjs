const port = process.env.PORT ?? "3000";
const baseUrl = process.env.NEXT_DEV_URL ?? `http://localhost:${port}`;
const routes = [
  "/",
  "/blogs",
  "/blogs/markdown",
  "/library",
  "/library/7-Languages-in-7-Weeks",
  "/works",
  "/works/local-audio-player",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForServer = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(baseUrl);

      if (response.ok) {
        return true;
      }
    } catch (_error) {
      await sleep(1000);
    }
  }

  return false;
};

const warmRoute = async (route) => {
  const startedAt = performance.now();
  const response = await fetch(new URL(route, baseUrl));
  const elapsedMs = Math.round(performance.now() - startedAt);

  console.log(`[dev:warm] ${response.status} ${route} ${elapsedMs}ms`);
};

const serverReady = await waitForServer();

if (serverReady) {
  for (const route of routes) {
    try {
      await warmRoute(route);
    } catch (error) {
      console.warn(
        `[dev:warm] skipped ${route}: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      );
    }
  }
} else {
  console.warn(`[dev:warm] server did not respond at ${baseUrl}`);
}
