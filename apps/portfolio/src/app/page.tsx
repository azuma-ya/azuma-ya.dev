import { Markdown } from "@repo/markdown/components/markdown";
import { Separator } from "@repo/ui/components/data-display/separator";
import { Container } from "@repo/ui/components/layout/container";

import { ProfileSection } from "@/features/profile/components/profile-section";
import { getProfile } from "@/features/profile/lib/get-profile";
import { getMetas } from "@/lib/meta";
import {} from "@repo/markdown/utils/meta";

export const generateMetadata = () => {
  const profile = getProfile();

  return {
    title: `${profile.name}'s Portfolio`,
    description: `${profile.name}のポートフォリオサイトです。スキルやブログを掲載しています。`,
    openGraph: {
      title: `${profile.name}'s Portfolio`,
      description: `${profile.name}のポートフォリオサイトです。スキルやブログを掲載しています。`,
    },
  };
};

const Page = async () => {
  const profile = getProfile();

  const metas = await getMetas(profile.content);

  return (
    <Container maxWidth="md" className="space-y-8">
      <ProfileSection data={profile} />
      <Separator />
      <Markdown metas={metas}>{profile.content}</Markdown>
    </Container>
  );
};

export default Page;
