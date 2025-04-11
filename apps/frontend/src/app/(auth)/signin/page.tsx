import {
  IconBrandApple,
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandTelegram,
} from "@tabler/icons-react";
import SwitchRouteButton from "../_components/SwitchRouteButton";
import AuthHeader from "../_components/AuthHeader";
import { Button } from "@components/button";
import Link from "next/link";

const providers = [
  {
    key: "facebook",
    name: "Facebook",
    icon: IconBrandFacebook,
  },
  {
    key: "telegram",
    name: "Telegram",
    icon: IconBrandTelegram,
  },
  {
    key: "google",
    name: "Google",
    icon: IconBrandGoogle,
  },
  {
    key: "apple",
    name: "Apple",
    icon: IconBrandApple,
  },
];

export default function SignIn() {
  return (
    <div className="flex h-[100dvh] w-[100vw] ">
      <AuthHeader
        header="Welcome back to HiJack!"
        subHeader="Sign in to HiJack!"
      />

      <div className="flex h-full flex-grow justify-center">
        <div className="flex h-full w-offset_width flex-col items-center">
          <div className="flex h-header_height w-full items-center justify-end">
            <SwitchRouteButton href="/signup">
              Get Started for Free
            </SwitchRouteButton>
          </div>

          <div className="flex w-[70%] flex-grow flex-col justify-center gap-[20px]">
            {providers.map((provider) => (
              <Button
                key={provider.key}
                color="light"
                className="flex items-center justify-between hover:cursor-pointer"
              >
                <provider.icon className="h-6 w-6 text-white" />
                <span>Sign In With {provider.name}</span>
              </Button>
            ))}
            <p className="w-full pt-[10px] text-center text-gray-600">
              New to HiJack?{" "}
              <Link href="/signup" className="text-blue-50">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
