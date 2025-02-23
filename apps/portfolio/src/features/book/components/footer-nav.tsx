import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@repo/ui/components/input/button";
import type { Book } from "../types/book";

interface Props {
  prev?: Book;
  next?: Book;
}

export const FooterNav = ({ prev, next }: Props) => {
  return (
    <nav className="flex md:flex-row flex-col w-full justify-between gap-4 items-center py-4">
      {prev && (
        <Button variant="ghost" className="whitespace-normal me-auto" asChild>
          <Link href={`/library/${prev.slug}`}>
            <MoveLeft className="mr-2" />
            {prev.title}
          </Link>
        </Button>
      )}
      {next && (
        <Button variant="ghost" className="whitespace-normal ms-auto" asChild>
          <Link href={`/library/${next.slug}`}>
            {next.title}
            <MoveRight className="ml-2" />
          </Link>
        </Button>
      )}
    </nav>
  );
};
