export default function Footer() {
  return (
    <footer className="border-border border-t py-4 md:px-8 md:py-0">
      <div className="container-wrapper">
        <div className="container py-4">
          <div className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Built by{" "}
            <a
              href={""}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Suraj
            </a>
            . The source code is available on{" "}
            <a
              href={""}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}
