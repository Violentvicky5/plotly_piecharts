"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type RecordItem = { label: string; value: number };
type EnrichedItem = RecordItem & { percent: number };

const RECORDS: RecordItem[] =Array.from({ length: 200 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 150) + 20,
}));

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
const xNumeric = labels.map((_, i) => i);
  return (
    <>
      <style jsx global>{`
        .js-plotly-plot .modebar {
          display: flex !important;
          transform: scale(0.5);
          transform-origin: top right;
        }
      `}</style>

      <div className="flex-1 w-full overflow-x-scroll">
      <Plot
  data={[
    {
      type: "scatter",
      mode: "lines+markers", // to show a dot at each point
      x: labels,
      y: values,
      line: { width: 2 },
      marker: { size: 6, color: "#636efa" }, // dot size anddd color
      customdata: percents,
      hovertemplate: "%{x}: %{y} (%{customdata:.1f}%)<extra></extra>",
    },
  ]}
  layout={{
    autosize: true,
    margin: { t: 50, b: 90, l: 10, r: 10 },
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
