import { getInfo } from "@/features/profile/lib/get-info";

export const Footer = () => {
  const info = getInfo();

  return (
    <footer className="mt-auto h-24 flex items-center justify-center">
      <p className="text-muted-foreground">
        &copy; {new Date().getFullYear()} {info.name}
      </p>
    </footer>
  );
};
