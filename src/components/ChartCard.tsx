"use client";
import { ReactNode, useEffect, useState } from "react";
import  SkeletonCard  from "./SkeletonCard";

type ChartCardProps = {
  title: string;
  children: ReactNode;
};

const ChartCard = ({ title, children }: ChartCardProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 flex flex-col w-full max-w-[350px] h-[300px]">
      {title && <h3>{title}</h3>}
      {loading ? <SkeletonCard /> : children}
    </div>
  );
};

export default ChartCard;
