import { IconBrandFacebook } from "@tabler/icons-react";
import { Button } from "@components/button";
import AuthHeader from "../_components/AuthHeader";
import SwitchRouteButton from "../_components/SwitchRouteButton";

export default function SignUp() {
  return (
    <div className="flex h-[100dvh] w-[100vw] ">
      <AuthHeader
        header="What channel would you like to start with?"
        subHeader="Don&#39;t worry, you can connect other channels later."
      />

      <div className="flex h-full flex-grow justify-center">
        <div className="flex h-full w-offset_width flex-col items-center">
          <div className="flex h-header_height w-full items-center justify-end">
            <SwitchRouteButton href="/signin">Sign in</SwitchRouteButton>
          </div>

          <div className="flex w-[70%] flex-grow flex-col justify-center gap-[20px]">
            <Button
              color="light"
              className="flex items-center justify-between hover:cursor-pointer"
            >
              <div className="px-[10px] py-[20px]">
                <div className="rounded-full bg-blue-50 p-[10px]">
                  <IconBrandFacebook className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-grow flex-col items-start gap-[6px] text-start">
                <h1 className="text-[22px] font-[700]">Facebook Massenger</h1>
                <p className="text-[14px] font-[400] leading-[15px] text-gray-600">
                  Create Facebook Messenger automation to keep customers happy.
                </p>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
