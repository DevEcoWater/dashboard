import { Gauge, LucideIcon } from "lucide-react";
import AnalyticsCard from "./analytics-card";

import React from "react";
import { Skeleton } from "../ui/skeleton";

interface ISummary {
  meters: any;
  isLoading: boolean;
}

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  isLoading: boolean;
  status: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon: Icon,
  status,
  isLoading,
}) => {
  return (
    <div
      className={`p-6 rounded-xl flex-auto border dark:bg-tertiary bg-white shadow-md`}
    >
      <div className="flex items-center gap-5 justify-center max-md:justify-between">
        <div>
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <Skeleton className="h-2 w-[100px] bg-gray-300 rounded-full" />
              <Skeleton className="h-2 w-[100px] bg-gray-300 rounded-full" />
            </div>
          ) : (
            <>
              <p>{title}</p>
              <h2 className="font-bold text-2xl">{value}</h2>
            </>
          )}
        </div>
        <div>
          <Icon
            style={{ backgroundColor: status }}
            className=" text-white p-3 rounded-full"
            size={50}
          />
        </div>
      </div>
    </div>
  );
};

const Summary: React.FC<ISummary> = ({ meters, isLoading }) => {
  const statusColors: Record<string, string> = {
    active: "#22BB33",
    inactive: "#f0ad4e",
    error: "#fe3839",
  };

  const counts =
    !isLoading &&
    meters.reduce(
      (acc: Record<string, number>, meter: any) => {
        acc[meter.status] = (acc[meter.status] || 0) + 1;
        return acc;
      },
      { active: 0, warning: 0, error: 0 }
    );

  const summaryData = [
    {
      title: "Total",
      value: !isLoading && meters.length.toString(),
      icon: Gauge,
      status: "#2463EB",
    },
    {
      title: "En linea",
      value: !isLoading && counts.active.toString(),
      icon: Gauge,
      status: statusColors.active,
    },
    {
      title: "Alerta",
      value: !isLoading && counts.inactive.toString(),
      icon: Gauge,
      status: statusColors.inactive,
    },
    {
      title: "Error",
      value: !isLoading && counts.error.toString(),
      icon: Gauge,
      status: statusColors.error,
    },
  ];

  return (
    <AnalyticsCard>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-10 mb-3">
        {summaryData.map((data, index) => (
          <SummaryCard
            key={index}
            title={data.title}
            value={data.value}
            icon={data.icon}
            status={data.status}
            isLoading={isLoading}
          />
        ))}
      </div>
    </AnalyticsCard>
  );
};

export default Summary;
