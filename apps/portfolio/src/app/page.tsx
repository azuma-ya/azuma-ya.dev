import { Markdown } from "@repo/markdown/components/markdown";
import { Separator } from "@repo/ui/components/data-display/separator";
import { Container } from "@repo/ui/components/layout/container";

import { ProfileSection } from "@/features/profile/components/profile-section";
import { getInfo } from "@/features/profile/lib/get-info";
import { getProfile } from "@/features/profile/lib/get-profile";
import { getMetas } from "@/lib/meta";

export const generateMetadata = () => {
  const info = getInfo();

  return {
    title: `${info.name}'s Portfolio`,
    description: `${info.name}のポートフォリオサイトです。スキルやブログを掲載しています。`,
    openGraph: {
      title: `${info.name}'s Portfolio`,
      description: `${info.name}のポートフォリオサイトです。スキルやブログを掲載しています。`,
    },
  };
};

const Page = async () => {
  const info = getInfo();
  const content = getProfile();

  const metas = await getMetas(content);

  return (
    <Container maxWidth="md" className="space-y-8 my-24">
      <ProfileSection data={info} />
      <Separator />
      <Markdown metas={metas}>{content}</Markdown>
    </Container>
  );
};

export default Page;
