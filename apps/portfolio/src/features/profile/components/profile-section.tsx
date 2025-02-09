import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/element/avatar";

import type { Profile } from "../types/profile";

interface Props {
  data: Profile;
}

export const ProfileSection = ({ data }: Props) => {
  return (
    <section className="flex items-center gap-4 justify-center mt-24">
      <Avatar className="size-18">
        <AvatarImage src={data.avatar} />
        <AvatarFallback className="font-bold text-xl">
          {data.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="">
        <p className="text-center font-bold text-xl">{data.name}</p>
        <p className="text-center text-base">{data.description}</p>
      </div>
    </section>
  );
};
