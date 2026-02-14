"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> {
  href?: string;
  to?: string; // For backward compatibility with react-router-dom
  activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, href, to, ...props }, ref) => {
    const pathname = usePathname();
    const target = (to || href || "") as string;
    const isActive = pathname === target;

    return (
      <Link
        ref={ref}
        href={target}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
