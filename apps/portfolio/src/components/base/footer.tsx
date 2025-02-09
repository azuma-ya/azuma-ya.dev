export const Footer = () => {
  return (
    <footer className="mt-auto h-24 flex items-center justify-center">
      <p className="text-xs text-foreground/50">
        &copy; {new Date().getFullYear()} Azuma-ya
      </p>
    </footer>
  );
};
