import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Overview
      </Link>
      <Link
        href="/projects"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/projects" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Projects
      </Link>
      <Link
        href="/scans"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/scans" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Scans
      </Link>
      <Link
        href="/integrations"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/integrations" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Integrations
      </Link>
      <Link
        href="/settings"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/settings" ? "text-primary" : "text-muted-foreground"
        )}
      >
        Settings
      </Link>
    </nav>
  )
}

