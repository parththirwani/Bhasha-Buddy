"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  iconSrc: string;
  href: string;
  isOpen?: boolean;
};

export const SidebarItem = ({
  label,
  iconSrc,
  href,
  isOpen = true,
}: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? "sidebarOutline"  : "sidebar"}
      className="justify-start h-[52px] dark:text-white dark:hover:bg-slate-800"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          alt={label}
          className="mr-5"
          height={40}
          width={40}
        />
        {isOpen && (
            <span className="ml-2">{label}</span> // Use span to wrap the label text
          )}
      </Link>
    </Button>
  );
};