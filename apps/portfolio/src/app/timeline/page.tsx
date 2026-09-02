import { getInfo } from "@/features/profile/lib/get-info";
import { getCanonicalUrl } from "@/lib/seo";

export const generateMetadata = () => {
  const info = getInfo();
  const canonicalUrl = getCanonicalUrl("/timeline");

  return {
    title: `Timeline | ${info.portfolio.title}`,
    description: `${info.portfolio.title}のタイムラインページ。`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Timeline | ${info.portfolio.title}`,
      description: `${info.portfolio.title}のタイムラインページ。`,
      url: canonicalUrl,
    },
  };
};

const TimelinePage = () => {
  return (
    <div className="flex h-[calc(100vh-16rem)] items-center justify-center">
      Coming soon...
    </div>
  );
};

export default TimelinePage;
