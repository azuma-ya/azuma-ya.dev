import { getInfo } from "@/features/profile/lib/get-info";

export const Footer = () => {
  const info = getInfo();

  return (
    <footer className="sticky top-full h-(--footer-height) flex flex-col items-center justify-center">
      <p className="text-muted-foreground">
        &copy; {new Date().getFullYear()} {info.name} | This site uses Google
        Analytics.
      </p>
    </footer>
  );
};
