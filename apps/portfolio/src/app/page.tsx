import { Markdown } from "@repo/markdown/components/markdown";
import { Separator } from "@repo/ui/components/element/separator";
import { Container } from "@repo/ui/components/layout/container";

import { ProfileSection } from "@/features/profile/components/profile-section";
import { getProfile } from "@/features/profile/lib/get-profile";

const Page = () => {
  const profile = getProfile();

  return (
    <Container maxWidth="sm" className="space-y-8">
      <ProfileSection data={profile} />
      <Separator />
      <Markdown>{profile.content}</Markdown>
    </Container>
  );
};

export default Page;
