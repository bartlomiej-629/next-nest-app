import { lighten } from "polished";
import { TablerIcon } from "@tabler/icons-react";

export type IconBoxProps = {
  title?: string;
  icon: TablerIcon;
  backgroundColor: string;
  className?: string;
};

export default function IconBox({
  title,
  className,
  icon: Icon,
  backgroundColor,
}: IconBoxProps) {
  const lighterColor = lighten(0.15, backgroundColor);

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`flex h-[84px] w-[84px] items-center justify-center rounded-[20px] bg-gradient-to-b p-6 ${className}`}
        style={{
          background: `linear-gradient(180deg, ${backgroundColor}, ${lighterColor})`,
        }}
      >
        <Icon size={36} />
      </div>
      <span className="lheight-normal text-center text-base">{title}</span>
    </div>
  );
}
