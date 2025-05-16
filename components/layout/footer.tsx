export function Footer() {
  return (
    <footer className="border-t border-border py-6 bg-muted/20">
      <div className="container flex flex-col items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MoodJukebox. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Music data powered by Spotify API
        </p>
      </div>
    </footer>
  );
}