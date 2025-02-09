import type { ReactNode } from "react";

interface Props {
  index: number;
  year: string;
  children: ReactNode;
}

export const YearSection = ({ index, year, children }: Props) => {
  return (
    <section
      className="space-y-2 animate-fade-in opacity-0"
      style={{
        animationDelay: `${index * 0.2}s`,
        animationFillMode: "forwards",
      }}
    >
      <h2 className="text-lg font-bold">{year}</h2>
      {children}
    </section>
  );
};
