import { Button } from "@components/button";
import Link from "next/link";

interface SwitchRouteButtonProps {
  children: React.ReactNode;
  href: string;
}

export default function AuthFlowButton({
  children,
  href,
}: SwitchRouteButtonProps) {
  return (
    <Link href={href}>
      <Button color="light" className="hover:cursor-pointer">
        {children}
      </Button>
    </Link>
  );
}
