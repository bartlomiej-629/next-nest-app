"use client";
import {
  IconMailOpened,
  IconMail,
  IconUsersGroup,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarLink = {
  title: string;
  href: string;
  icon: any;
  badgeCount?: number;
};

type BadgeProps = {
  count: number;
  className?: string;
};

type DashboardSidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
};

const sidebarLinks: SidebarLink[] = [
  {
    title: "Unassigned",
    href: "/",
    icon: <IconMailOpened width={24} height={24} />,
    badgeCount: 12,
  },
  {
    title: "You",
    href: "/you",
    icon: <IconMail width={24} height={24} />,
    badgeCount: 1,
  },
  {
    title: "Team",
    href: "/team",
    icon: <IconUsers width={24} height={24} />,
    badgeCount: 99,
  },
  {
    title: "All",
    href: "/all",
    icon: <IconUsersGroup width={24} height={24} />,
    badgeCount: 112,
  },
];

function Badge({ count, className }: BadgeProps) {
  return (
    <span
      className={`bg-slate-200 flex h-5 w-5 items-center justify-center rounded-full text-xs text-black ${className}`}
    >
      {count}
    </span>
  );
}

function SidebarItem({
  title,
  href,
  icon,
  badgeCount,
}: SidebarLink) {
  const pathname = usePathname();
  return (
    <span
      className={`relative flex w-full items-center justify-start transition-all duration-300 h-9"}`}
    >
      <button
        className={`before:bg-primary-500 flex w-full cursor-default items-center justify-start rounded-lg text-left text-xs font-normal text-zinc-950 transition-all duration-300 before:absolute before:-left-3 before:block before:h-full before:w-0 before:rounded-br-md before:rounded-tr-md before:transition-all before:content-[''] hover:before:w-[4px] ${pathname === href ? "before:w-[4px]" : ""}}`}
        type="button"
      >
        <Link className="w-full" href={href}>
          <div
            className={`flex w-full items-center justify-between rounded-sm hover:bg-gray-400 pl-1 pr-1 ${pathname === href ? "bg-white/5" : ""}`}
          >
            <div className="flex items-center">
              {icon}
              <span
              className={`ml-1 mr-1.5 text-nowrap font-normal block"}`}
              >
              {title}
              </span>
            </div>
            {badgeCount ? <Badge count={badgeCount} /> : null}
          </div>
        </Link>
      </button>
    </span>
  );
}

export default function InboxSidebar() {
  return (
    <nav className="flex h-full min-h-0 flex-col transition-all duration-300">
      <div className="flex flex-1 flex-col gap-1.5 px-3 transition-all duration-300">
        {sidebarLinks.map((link) => (
          <SidebarItem key={link.title} {...link} />
        ))}
      </div>
    </nav>
  );
}
