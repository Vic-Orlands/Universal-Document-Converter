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
} from "lucide-react";

function Header() {
  return (
    <header className="sticky container top-0 z-40 w-full border-b bg-background flex h-16 items-center space-x-5 sm:justify-between sm:space-x-0">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:text-gray-700">
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
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

export default Header;
