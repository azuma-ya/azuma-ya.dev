import { getInfo } from "@/features/profile/lib/get-info";
import { Container } from "@repo/ui/components/layout/container";

export const generateMetadata = () => {
  const info = getInfo();

  return {
    title: `Not Found | ${info.name}'s Portfolio`,
    openGraph: {
      title: `Not Found | ${info.name}'s Portfolio`,
    },
  };
};

const NotFoundPage = () => {
  return (
    <Container maxWidth="md" className="space-y-8 my-24">
      <h1 className="text-2xl font-bold">Lost?</h1>
      <p className="text-muted-foreground">This page does not exist.</p>
    </Container>
  );
};

export default NotFoundPage;
