import { Markdown } from "@repo/markdown/components/markdown";
import { Separator } from "@repo/ui/components/element/separator";
import { Container } from "@repo/ui/components/layout/container";

import { ProfileSection } from "@/features/profile/components/profile-section";
import { getProfile } from "@/features/profile/lib/get-profile";

export const generateMetadata = () => {
  const profile = getProfile();

  return {
    title: `${profile.name}'s Portfolio`,
    description: `${profile.name}のポートフォリオサイトです。スキルやブログを掲載しています。`,
  };
};

const Page = () => {
  const profile = getProfile();

  return (
    <Container maxWidth="md" className="space-y-8">
      <ProfileSection data={profile} />
      <Separator />
      <Markdown>{profile.content}</Markdown>
    </Container>
  );
};

export default Page;
