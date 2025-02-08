import Markdown from "@/components/data-display/markdown";
import { ProfileSection } from "@/features/profile/components/profile-section";
import { getProfile } from "@/features/profile/lib/get-profile";
import { Separator } from "@repo/ui/components/element/separator";

const Page = () => {
  const profile = getProfile();

  return (
    <main className="space-y-8 max-w-2xl mx-auto">
      <ProfileSection data={profile} />
      <Separator />
      <Markdown>{profile.content}</Markdown>
    </main>
  );
};

export default Page;
