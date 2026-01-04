export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 blur-sm"></div>
              <img
                src="/favicon.png"
                alt="Nihongo Word Sensei Logo"
                className="relative h-8 w-8 rounded-lg object-contain drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-tight text-foreground">
                Nihongo Word Sensei
              </h1>
              <p className="text-xs text-muted-foreground">
                Master Japanese vocabulary
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
