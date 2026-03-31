import { NavItemProps } from "@/interface";
import NavItems from "../ui/NavItems";
import Link from "next/link";

export default function Navbar() {
  const navItems: NavItemProps[] = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="absolute top-0 left-0 w-full px-8 md:px-16 py-8 flex justify-between items-center z-50">
      <Link
        href={"/"}
        className="font-serif text-xl text-gray-800 tracking-wide"
      >
        Eng.Saber
      </Link>
      <NavItems navItems={navItems} />
    </header>
  );
}
