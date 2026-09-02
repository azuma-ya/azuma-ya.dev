const ensureLeadingSlash = (pathname: string) =>
  pathname.startsWith("/") ? pathname : `/${pathname}`;

export const getBaseUrl = () => process.env.NEXT_PUBLIC_BASE_URL!;

export const getCanonicalUrl = (pathname = "/") =>
  new URL(ensureLeadingSlash(pathname), getBaseUrl()).toString();

export const getPathname = (...segments: string[]) => {
  if (segments.length === 0) {
    return "/";
  }

  return `/${segments.map(encodeURIComponent).join("/")}`;
};
