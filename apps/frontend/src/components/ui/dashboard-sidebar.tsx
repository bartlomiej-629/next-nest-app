"use client";
import {
  IconAddressBook,
  IconLayoutDashboard,
  IconMessageCircle,
  IconPlayerPlay,
  IconSettings,
  IconChevronLeft,
  IconChevronRight,
  IconFishHook,
  IconSparkles,
  IconLifebuoy,
  IconBolt,
  IconChevronUp,
  IconChevronDown,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import Image from "next/image";
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
    title: "Home",
    href: "/",
    icon: <IconLayoutDashboard width={24} height={24} />,
  },
  {
    title: "Contacts",
    href: "/contacts",
    icon: <IconAddressBook width={24} height={24} />,
  },
  {
    title: "Automation",
    href: "#",
    icon: <IconPlayerPlay width={24} height={24} />,
  },
  {
    title: "Inbox",
    href: "/inbox",
    icon: <IconMessageCircle width={24} height={24} />,
    badgeCount: 12,
  },
  {
    title: "Settings",
    href: "#",
    icon: <IconSettings width={24} height={24} />,
  },
];

const sidebarFooterLinks: SidebarLink[] = [
  {
    title: "Request Features",
    href: "#",
    icon: <IconFishHook />,
  },
  {
    title: "Changelog",
    href: "#",
    icon: <IconSparkles />,
  },
  {
    title: "Support",
    href: "#",
    icon: <IconLifebuoy />,
  },
];

function Badge({ count, className }: BadgeProps) {
  return (
    <span
      className={`bg-primary-500 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white ${className}`}
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
  isOnFooter,
  isCollapsed,
}: SidebarLink & { isCollapsed: boolean; isOnFooter?: boolean }) {
  const pathname = usePathname();
  return (
    <span
      className={`relative flex w-full items-center justify-start transition-all duration-300 ${isOnFooter ? "h-8" : "h-9"}`}
    >
      <button
        className={`before:bg-primary-500 flex w-full cursor-default items-center justify-start rounded-lg text-left text-base font-normal text-zinc-950 transition-all duration-300 before:absolute before:-left-3 before:block before:h-full before:w-0 before:rounded-br-md before:rounded-tr-md before:transition-all before:content-[''] hover:before:w-[4px] ${!isOnFooter && pathname === href ? "before:w-[4px]" : ""} ${isCollapsed && isOnFooter ? "hover:bg-primary-500" : ""}`}
        type="button"
      >
        <Link className="w-full" href={href}>
          <div
            className={`flex w-full items-center rounded-lg px-4 py-1.5 text-white hover:bg-white/5 ${pathname === href ? "bg-white/5" : ""}`}
          >
            <div className="relative">
              {icon}
              {isCollapsed && badgeCount ? (
                <Badge
                  count={badgeCount}
                  className="absolute -right-3.5 -top-1"
                />
              ) : null}
            </div>
            <span
              className={`ml-4 mr-1.5 text-nowrap font-normal ${isCollapsed ? "hidden" : "block"}`}
            >
              {title}
            </span>
            {!isCollapsed && badgeCount ? <Badge count={badgeCount} /> : null}
          </div>
        </Link>
      </button>
    </span>
  );
}

export default function DashboardSidebar({
  isCollapsed,
  setIsCollapsed,
}: DashboardSidebarProps) {
  return (
    <nav className="flex h-full min-h-0 flex-col transition-all duration-300">
      <div
        className={`relative mt-2.5 flex h-[70px] flex-col border-b border-white/5 p-3`}
      >
        <div
          className={`relative ${isCollapsed ? "h-[46px] w-[58px]" : "h-[46px] w-40"}`}
        >
          <Image
            src={isCollapsed ? "/assets/logo.png" : "/assets/logo-title.png"}
            fill
            alt="Logo"
            className="object-contain"
          />
        </div>
        <button
          className={`absolute -right-[16px] top-[1.4rem] flex h-7 w-7 items-center justify-center rounded-full border bg-white p-1 text-gray-800 shadow-md transition-all duration-300`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <IconArrowRight size={16} />
          ) : (
            <IconArrowLeft size={16} />
          )}
        </button>
      </div>
      <div className="p-3">
        <div className="flex justify-between p-3">
          <div className="flex h-[37px] items-center gap-3">
            <Image
              src={"/assets/user.png"}
              width={32}
              height={32}
              alt="Jane Parker"
              className="h-8 w-8 rounded-full"
            />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-nowrap text-base font-bold text-white">
                  Jane Parker
                </span>
                <span className="text-nowrap text-xs text-white">
                  Instagram
                </span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <div className="flex items-center">
              <button className="text-white">
                <IconChevronDown />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-3 transition-all duration-300">
        {sidebarLinks.map((link) => (
          <SidebarItem key={link.title} {...link} isCollapsed={isCollapsed} />
        ))}
      </div>
      <div className="px-3 pb-3">
        {!isCollapsed && (
          <div
            className={`animate-fade mb-2.5 h-[126px] max-w-sm overflow-hidden rounded border border-zinc-800 bg-zinc-900 shadow-lg`}
          >
            <div className="flex flex-col gap-2.5 p-2.5">
              <div className="lheight-normal text-base font-bold text-white">
                Free Trial
              </div>
              <div className="flex h-1.5 rounded-full bg-white">
                <div className="bg-primary-500 w-[25%] rounded-full"></div>
              </div>
              <p className="lheight-normal text-xs text-white">
                Your trial ends in 7 days.
              </p>
              <button className="bg-primary-500 w-full rounded-md px-3 py-2 text-center text-white">
                <span className="flex items-center justify-center">
                  <IconBolt size={20} />
                  <span className="mx-1.5 text-nowrap text-xs font-semibold">
                    Activate Pro
                  </span>
                </span>
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-1 flex-col gap-1.5">
          {isCollapsed && (
            <SidebarItem
              title="Free Trial"
              href="#"
              icon={<IconBolt />}
              isOnFooter={true}
              isCollapsed={isCollapsed}
            />
          )}
          {sidebarFooterLinks.map((link) => (
            <SidebarItem
              key={link.title}
              {...link}
              isOnFooter={true}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
      <div className="mb-2.5 border-t px-[23px] py-3 dark:border-white/5">
        <div className="flex h-[37px] justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={"/assets/user.png"}
              width={32}
              height={32}
              alt="Jane Parker"
              className="h-8 w-8 rounded"
            />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-nowrap text-base font-bold text-white">
                  Jane Parker
                </span>
                <span className="text-nowrap text-xs text-white">
                  jane@parker.io
                </span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <div className="flex items-center">
              <button className="text-white">
                <IconChevronUp />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
