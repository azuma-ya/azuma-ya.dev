export const Footer = () => {
  return (
    <footer className="mt-auto h-24 flex items-center justify-center">
      <p className="text-muted-foreground">
        &copy; {new Date().getFullYear()} Azuma-ya
      </p>
    </footer>
  );
};
