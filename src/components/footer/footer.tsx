function Footer() {
  return (
    <footer className="border-t py-6 md:px-8 md:py-0 flex flex-col items-center justify-center gap-4 md:h-12 md:flex-row">
      <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
        © {new Date().getFullYear()} MezieIV. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
