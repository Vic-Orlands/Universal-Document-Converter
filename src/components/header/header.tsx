"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  FileText,
  FileCode2,
  Code,
  FileCode,
  MoveHorizontal,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "../ui/button";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);

    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <header className="sticky container top-0 z-40 w-full border-b bg-background flex h-16 items-center space-x-5 sm:justify-between sm:space-x-0">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:text-gray-700 dark:hover:text-gray-300">
                <FileCode className="mr-2 w-6" />
                Universal Document Converter
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/html-markdown" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <FileCode2 className="mr-2 w-5" />
                HTML
                <MoveHorizontal className="m-1 w-4" />
                Markdown
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/word-conversion" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <FileText className="mr-2 w-5" />
                Word Docs
                <MoveHorizontal className="mx-1 w-4" />
                Markdown
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/advanced" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Code className="mr-2 w-5" />
                Advanced
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <Button variant="outline" onClick={toggleTheme}>
            {!isDarkMode ? <Sun /> : <Moon />}
          </Button>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

export default Header;
