import { signIn } from "@/lib/auth";
import { Button } from "@repo/ui/components/input/button";

async function Page() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
      className="flex flex-col h-screen justify-center items-center"
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
}

export default Page;
