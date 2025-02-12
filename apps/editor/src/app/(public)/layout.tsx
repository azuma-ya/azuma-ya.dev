import { Container } from "@repo/ui/components/layout/container";

import { Footer } from "@/components/base/footer";
import { Header } from "@/components/base/header";

interface Props {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container maxWidth="xl">{children}</Container>
      <Footer />
    </div>
  );
};

export default PublicLayout;
