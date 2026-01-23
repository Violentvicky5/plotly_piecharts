"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { Layout } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type RecordItem = { label: string; value: number };
type EnrichedItem = RecordItem & { percent: number };

const RECORDS: RecordItem[] = [
  { label: "Chrome", value: 120 },
  { label: "Firefox", value: 90 },
  { label: "Edge", value: 79 },
  { label: "Safari", value: 60 },
  { label: "Brave", value: 150 },
  { label: "Opera", value: 110 },
  { label: "Vivaldi", value: 95 },
  { label: "Samsung", value: 80 },
  { label: "UC", value: 70 },
  { label: "Tor", value: 65 },
  { label: "IE", value: 140 },
  { label: "DuckDuckGo", value: 100 },
  { label: "Yandex", value: 85 },
  { label: "Maxthon", value: 55 },
  { label: "Pale Moon", value: 55 },
  { label: "QQ", value: 130 },
  { label: "Sogou", value: 105 },
  { label: "Baidu", value: 98 },
  { label: "Whale", value: 88 },
  { label: "Other", value: 70 },
];

export default function Type13() {
  const total = useMemo(
    () => RECORDS.reduce((sum, r) => sum + r.value, 0),
    []
  );

  const enriched: EnrichedItem[] = useMemo(
    () =>
      RECORDS.map((r) => ({
        ...r,
        percent: total ? (r.value / total) * 100 : 0,
      })),
    [total]
  );

  const labels = enriched.map((e) => e.label);
  const values = enriched.map((e) => e.value);
  const percents = enriched.map((e) => e.percent);

  return (
    <>
      <style jsx global>{`
        .js-plotly-plot .modebar {
          display: flex !important;
          transform: scale(0.5);
          transform-origin: top right;
        }
      `}</style>

      <div className="flex-1 w-full">
      <Plot
  data={[
    {
      type: "scatter",
      mode: "lines+markers", // <-- add this to show a dot at each point
      x: labels,
      y: values,
      line: { width: 2 },
      marker: { size: 6, color: "#636efa" }, // dot size & color
      customdata: percents,
      hovertemplate: "%{x}: %{y} (%{customdata:.1f}%)<extra></extra>",
    },
  ]}
  layout={{
    autosize: true,
    margin: { t: 50, b: 90, l: 20, r: 10 },
    paper_bgcolor: "lightgray",
    plot_bgcolor: "lightgray",
    showlegend: false,
    xaxis: {
      showticklabels: false, // keeps x-axis labels hidden
      showgrid: true,
      zeroline: false,
    },
    yaxis: {
      tickfont: { size: 7 },
      automargin: true,
      zeroline: false,
      showgrid: true,
    },
  }}
  config={{
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
  }}
  style={{
    width: Math.max(labels.length * 10, 200),
    minWidth: "100%",
    height: "100%",
  }}
/>

      </div>
    </>
  );
}
