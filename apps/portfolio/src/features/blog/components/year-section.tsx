import type { ReactNode } from "react";

interface Props {
  year: string;
  children: ReactNode;
}

export const YearSection = ({ year, children }: Props) => {
  return (
    <section className="space-y-1">
      <h2 className="text-xs font-bold">{year}</h2>
      {children}
    </section>
  );
};
