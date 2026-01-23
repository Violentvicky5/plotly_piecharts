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
  const total = useMemo(() => RECORDS.reduce((s, r) => s + r.value, 0), []);

 const enriched: EnrichedItem[] = useMemo(
  () =>
    [...RECORDS]
      .sort((a, b) => a.value - b.value) // high → low
      .map((r) => ({
        ...r,
        percent: total ? (r.value / total) * 100 : 0,
      })),
  [total],
);


  const labels = enriched.map((e) => e.label);
  const values = enriched.map((e) => e.value);
  const percents = enriched.map((e) => e.percent);

  const colors = [
    "#636efa",
    "#EF553B",
    "#00cc96",
    "#ab63fa",
    "#FFA15A",
    "#19d3f3",
    "#FF6692",
    "#B6E880",
    "#FF97FF",
    "#FECB52",
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
    "#7f7f7f",
    "#bcbd22",
    "#17becf",
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

      {/* vertical scroll container */}
      <div className="flex-1 w-full overflow-y-auto" style={{ maxHeight: 400 }}>
        <Plot
          data={[
            {
              type: "bar",
              orientation: "h",
             y: labels,
              x: values,
              marker: { color: colors },
              text: labels,
              textposition: "inside",
              textangle: 0,
              textfont: { size: 12, color: "black" },
              customdata: percents,
              hovertemplate: "%{y}: %{x} (%{customdata:.1f}%)<extra></extra>",
            },
          ]}
          layout={
            {
              autosize: true,
              margin: { t: 20, b: 30, l: 15, r: 20 },
              paper_bgcolor: "lightgray",
              plot_bgcolor: "lightgray",
              showlegend: false,
              xaxis: {
                zeroline: false,
                showgrid: true,
                side: "bottom",
              },

              yaxis: {
                showticklabels: false,
                ticks: "",
                showgrid: false,
                zeroline: false,
                showline: false,
              },
            } 
          }
          config={{
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
          }}
          style={{
            height: Math.max(labels.length * 25, 300),
            width: "100%",
          }}
        />
      </div>
    </>
  );
}
