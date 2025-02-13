import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/data-display/avatar";

import type { Info } from "../types/info";

interface Props {
  data: Info;
}

export const ProfileSection = ({ data }: Props) => {
  return (
    <section className="flex items-center gap-4 justify-center">
      <Avatar className="size-18">
        <AvatarImage src={data.avatar} />
        <AvatarFallback className="font-bold text-xl">
          {data.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="">
        <p className="text-center font-bold text-xl">{data.name}</p>
        <p className="text-center text-base">{data.role}</p>
      </div>
    </section>
  );
};
