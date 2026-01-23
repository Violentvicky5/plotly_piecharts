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

export default function Type12() {
  const total = useMemo(() => RECORDS.reduce((sum, r) => sum + r.value, 0), []);

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

  const colors = [
    "#636efa", "#EF553B", "#00cc96", "#ab63fa", "#FFA15A", "#19d3f3",
    "#FF6692", "#B6E880", "#FF97FF", "#FECB52", "#1f77b4", "#ff7f0e",
    "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f",
    "#bcbd22", "#17becf",
  ];

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
              type: "bar",
              x: labels,
              y: values,
              marker: { color: colors },
              text: labels,
              textposition: "auto",
              textangle: -90,
              textfont: { size: 8, color: "black" },
              customdata: percents,
              hovertemplate: "%{x}: %{y} (%{customdata:.1f}%)<extra></extra>",
            },
          ]}
          layout={
            {
              autosize: true,
              margin: { t: 50, b: 10, l: 20, r: 10 }, // increase top margin for modebar
              paper_bgcolor: "lightgray",
              plot_bgcolor: "lightgray",
              showlegend: false,
              xaxis: { showticklabels: false, showgrid: false, zeroline: false },
              yaxis: { tickfont: { size: 7 }, automargin: true, zeroline: false, showgrid: true },
            
            } 
          }
          config={{
            responsive: true,
            displayModeBar: true, 
            displaylogo: false,
          }}
          style={{
            width: Math.max(labels.length * 11), 
            minWidth: "100%",
            height: "100%",
          }}
        />
      </div>
    </>
  );
}
