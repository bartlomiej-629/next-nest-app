"use client";

import PageTitle from "@components/page-title";
import StatisticsCard, {
  StatisticsCardProps,
} from "@components/statistics-card";
import {
  IconChartArcs3,
  IconMessage,
  IconMessageOff,
  IconMessageReport,
  IconUserSquareRounded,
} from "@tabler/icons-react";
import AppsCard from "@components/apps-card";
import AgentPerformanceTable from "@components/agent-performance-table";

export default function Home() {
  const statistics1: StatisticsCardProps[] = [
    {
      title: "Contacts",
      icon: IconUserSquareRounded,
      iconBackgroundColor: "#FFFDB6",
      totalValue: 102,
      lastDaysValue: 52,
    },
    {
      title: "Messages",
      icon: IconMessage,
      iconBackgroundColor: "#EFFEFF",
      totalValue: 102,
      lastDaysValue: 49,
    },
    {
      title: "Automations",
      icon: IconChartArcs3,
      iconBackgroundColor: "#F7F0FF",
      totalValue: 102,
      lastDaysValue: 102,
    },
  ];

  const statistics2: StatisticsCardProps[] = [
    {
      title: "Open Cases",
      icon: IconMessageReport,
      iconBackgroundColor: "#FFEFEE",
      totalValue: 102,
      lastDaysValue: 52,
    },
    {
      title: "Closed Cases",
      icon: IconMessageOff,
      iconBackgroundColor: "#F7FFF0",
      totalValue: 102,
      lastDaysValue: 52,
    },
  ];

  const agentPerformances = [
    {
      agentName: "Jane Parker",
      agentPhoto: "/assets/user.png",
      today: 15,
      last7Days: 42,
      rate: 24,
    },
    {
      agentName: "Jane Parker",
      agentPhoto: "/assets/user.png",
      today: 25,
      last7Days: 42,
      rate: 24,
    },
    {
      agentName: "Jane Parker",
      agentPhoto: "/assets/user.png",
      today: 11,
      last7Days: 42,
      rate: 24,
    },
  ];

  return (
    <>
      <PageTitle title="Home" />
      <div className="mx-auto max-w-screen-lg px-5 pb-[60px] pt-12 lg:px-0 ">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-4xl font-bold">Ahoy, Jane!</h3>
            <p className="lheight-normal m-0 text-base text-gray-700">
              Here are your latest statistics of your account
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {statistics1.map((statistic, index) => (
              <StatisticsCard key={index} {...statistic} />
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {statistics2.map((statistic, index) => (
              <StatisticsCard key={index} {...statistic} />
            ))}
          </div>
          <AgentPerformanceTable agentPerformances={agentPerformances} />
          <AppsCard />
        </div>
      </div>
    </>
  );
}
