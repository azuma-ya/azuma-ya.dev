import { Button } from "@repo/ui/components/input/button";

export const runtime = "edge";

async function Page() {
  return (
    <form
      action={async () => {
        "use server";
      }}
      className="flex flex-col h-screen justify-center items-center"
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
}

export default Page;
