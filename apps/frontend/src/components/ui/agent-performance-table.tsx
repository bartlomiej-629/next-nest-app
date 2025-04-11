import Image from "next/image";
import { IconMessageChatbot } from "@tabler/icons-react";

type AgentPerformance = {
  agentName: string;
  agentPhoto: string;
  today: number;
  last7Days: number;
  rate: number;
};

type AgentPerformanceTableProps = {
  agentPerformances: AgentPerformance[];
};

export default function AgentPerformanceTable({
  agentPerformances,
}: AgentPerformanceTableProps) {
  const rows = agentPerformances?.map((agentPerformance, index) => {
    const { agentName, agentPhoto, today, last7Days, rate } = agentPerformance;

    return (
      <tr className="border-ink-200 border-t" key={index}>
        <td className="p-2.5">
          <div className="flex items-center gap-1.5">
            {agentPhoto && (
              <Image
                src={agentPhoto}
                width={32}
                height={32}
                alt={agentName}
                className="rounded-full"
              />
            )}
            <span className="lheight-normal font-bold">{agentName}</span>
          </div>
        </td>
        <td className="p-2.5 text-center">{today}</td>
        <td className="p-2.5 text-center">{last7Days}</td>
        <td className="p-2.5 text-end">{rate}%</td>
      </tr>
    );
  });

  return (
    <div className="flex flex-1 flex-col gap-1.5">
      <p className="lheight-normal text-xl font-medium">Agent Performance</p>
      <div className="border-ink-200 flex flex-col gap-6 overflow-x-auto rounded-md border bg-white p-6">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-md"
          style={{
            backgroundColor: "#FCEEFF",
          }}
        >
          <IconMessageChatbot size={18} />
        </div>

        <table className="min-w-[900px] text-left lg:w-full">
          <thead className="border-ink-200 border-t">
            <tr>
              <th className="lheight-normal py-2.5">Closed</th>
              <th className="lheight-normal py-2.5 text-center font-normal">
                Today
              </th>
              <th className="lheight-normal py-2.5 text-center font-normal">
                Last 7 days
              </th>
              <th className="lheight-normal w-[220px] py-2.5 text-end font-normal">
                Rate
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}
