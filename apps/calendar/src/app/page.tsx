import { Button } from "@repo/ui/components/input/button";
import { Container } from "@repo/ui/components/layout/container";

const Page = () => {
  return (
    <Container maxWidth="md">
      <div className="size-full h-[calc(100vh-16rem)] flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl">Wellcome!!</h1>
        <Button>Go</Button>
      </div>
    </Container>
  );
};

export default Page;
