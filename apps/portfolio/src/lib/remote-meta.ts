export const shouldFetchRemoteMeta = () =>
  process.env.NODE_ENV !== "development" ||
  process.env.PORTFOLIO_FETCH_REMOTE_META === "true";
