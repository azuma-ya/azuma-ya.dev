import { getInfo } from "@/features/profile/lib/get-info";

export const Footer = () => {
  const info = getInfo();

  return (
    <footer className="sticky top-full h-(--footer-height) flex flex-col items-center justify-center">
      <p className="text-muted-foreground text-center">
        &copy; {new Date().getFullYear()} {info.name}
        <span className="hidden md:inline"> | </span>
        <span className="block text-sm md:inline md:text-base">
          This site uses Google Analytics.
        </span>
      </p>
    </footer>
  );
};
