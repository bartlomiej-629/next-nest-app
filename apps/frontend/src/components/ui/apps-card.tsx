import Image from "next/image";
import {
  IconBrandMailgun,
  IconBrandShopee,
  IconBrandStripe,
  IconPlus,
} from "@tabler/icons-react";
import IconBox, { IconBoxProps } from "./icon-box";

export default function AppsCard() {
  const apps: IconBoxProps[] = [
    {
      title: "Shopify",
      icon: IconBrandShopee,
      backgroundColor: "#61D851",
    },
    {
      title: "Stripe",
      icon: IconBrandStripe,
      backgroundColor: "#5180D8",
    },
    {
      title: "Mailgun",
      icon: IconBrandMailgun,
      backgroundColor: "#F47266",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <p className="lheight-normal text-xl font-medium">Apps</p>

      <div className="border-ink-200 flex flex-col gap-3 rounded-md border bg-white p-6">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Image
              src="/assets/new-app.png"
              width={475}
              height={166}
              alt="New App"
              className="w-full"
            />
            <div className="flex items-center gap-3">
              <span className="text-primary-500 border-primary-500 rounded-md border p-1.5 text-xs font-semibold">
                Featured
              </span>
              <span className="lheight-normal text-base">New App</span>
            </div>
          </div>
          <div className="grid grid-cols-3 items-start gap-6 sm:flex  md:grid-cols-4">
            {apps.map((app, index) => (
              <IconBox key={index} {...app} />
            ))}

            <IconBox
              icon={IconPlus}
              backgroundColor="transparent"
              className="border-2 border-dashed border-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
