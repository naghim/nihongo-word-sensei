export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border/20 py-4">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground">
          Nihongo Word Sensei • Made by
          <a
            href="https://github.com/naghim"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 font-medium text-primary hover:underline"
          >
            naghim
          </a>
          • View on
          <a
            href="https://github.com/naghim/nihongo-word-sensei"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-1 font-medium text-primary hover:underline"
          >
            GitHub
          </a>
          • v1.0
        </p>
      </div>
    </footer>
  );
};
