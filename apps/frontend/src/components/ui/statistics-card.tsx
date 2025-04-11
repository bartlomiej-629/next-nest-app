"use client";

import { TablerIcon } from "@tabler/icons-react";

export type StatisticsCardProps = {
  title?: string;
  icon?: TablerIcon;
  iconBackgroundColor?: string;
  totalValue: number;
  lastDaysValue: number;
};

export default function StatisticsCard({
  title,
  icon: Icon,
  iconBackgroundColor = "#FFFDB6",
  totalValue = 0,
  lastDaysValue = 0,
}: StatisticsCardProps) {
  return (
    <div className="flex flex-1 flex-col gap-1.5">
      {title && <p className="lheight-normal text-xl font-medium">{title}</p>}

      <div className="border-ink-200 flex flex-col gap-3 rounded-md border bg-white p-6">
        {Icon && (
          <div
            className="flex h-12 w-12 items-center justify-center rounded-md"
            style={{
              backgroundColor: iconBackgroundColor,
            }}
          >
            <Icon size={18} />
          </div>
        )}

        <div className="flex justify-between">
          <div className="flex flex-col gap-[3px]">
            <span className="lheight-normal text-base">Total</span>
            <span className="lheight-normal text-2xl font-bold">
              {totalValue}
            </span>
          </div>
          <div className="flex flex-col gap-[3px]">
            <span className="lheight-normal text-base">Last 7 days</span>
            <span className="lheight-normal text-2xl font-bold">
              {lastDaysValue}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
