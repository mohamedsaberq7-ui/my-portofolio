import { NavItemProps } from "@/interface";
import Link from "next/link";

export default function NavItems({ navItems }: { navItems: NavItemProps[] }) {
  return (
    <nav className="hidden md:flex space-x-8 text-sm text-gray-500">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="hover:text-gray-800 transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
