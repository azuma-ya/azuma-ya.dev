import type { ReactNode } from "react";
import type { Meta } from "../utils/meta";

export interface LinkCardProps {
  href: string;
  children?: ReactNode | undefined;
  metas: Meta[];
}

export const LinkCard = ({ href, children, metas }: LinkCardProps) => {
  const target = metas.find((meta) => meta.url === href);

  if (target) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-start bg-background border rounded-md w-full mt-4 mb-2 no-underline! overflow-hidden text-primary!"
      >
        {target.image && (
          <div className="relative md:aspect-video aspect-square h-36">
            <img
              src={target.image}
              alt={target.title}
              className="absolute object-cover size-full"
            />
          </div>
        )}
        <div className="space-y-4 m-4 md:m-8">
          <h5 className="text-sm whitespace-pre-wrap mt-0!">{target.title}</h5>
          <div className="text-gray-400 text-xs whitespace-pre-wrap">
            {target.description}
          </div>
          {!target.image && (
            <p className="text-gray-400 text-xs whitespace-pre-wrap">{href}</p>
          )}
        </div>
      </a>
    );
  }

  return (
    <a href={href} target="_brank">
      {children}
    </a>
  );
};
