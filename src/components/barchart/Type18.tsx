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
      RECORDS.map((r) => ({
        ...r,
        percent: total ? (r.value / total) * 100 : 0,
      })),
    [total],
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

      <div className="flex-1 w-full" style={{ maxHeight: 400 }}>
        <Plot
          data={[
            // independent vertical lines
            {
              type: "scatter",
  mode: "lines+markers",
                y: values.flatMap((v) => [0, v, null]),
              x: labels.flatMap((l) => [l, l, null]),
              customdata: percents.flatMap((p) => [p, p, null]),
              hovertemplate: "%{x}: %{y} (%{customdata:.1f}%)<extra></extra>",
              line: { width: 2, color: "#636efa" },
               marker: { size: 3, color: "#ff0000" }, 
            },
          ]}
          layout={
            {
              autosize: true,
              margin: { t: 20, b: 20, l: 40, r: 40 },
              paper_bgcolor: "lightgray",
              plot_bgcolor: "lightgray",
              showlegend: false,
              xaxis: {
                zeroline: false,
                showgrid: false,
                showticklabels: false,
              },
              yaxis: { zeroline: false, showgrid: true, showticklabels: true, tickfont: { size: 7, color: "black" }, },

              annotations: labels.map((l, i) => ({
                x: l,
                y: values[i] + 2,
                text: l,
                showarrow: false,
                textangle: -90,
                font: { size: 8, color: "black" },
                xanchor: "center",
                yanchor: "bottom",
              })) as any, 
            } as Partial<Layout>
          }
          config={{
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
          }}
          style={{ height: Math.max(labels.length * 12.5, 200), width: "100%" }}
        />
      </div>
    </>
  );
}
