import { auth, signOut } from "@/lib/auth";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/data-display/avatar";
import { Button } from "@repo/ui/components/input/button";

async function Page() {
  const session = await auth();
  return (
    <div className="">
      <Avatar>
        <AvatarImage src={session?.user?.image || ""} />
        <AvatarFallback className="font-bold text-xl">
          {session?.user?.name?.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}

export default Page;
