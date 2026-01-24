"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { Layout } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type RecordItem = { label: string; value: number };
type EnrichedItem = RecordItem & { percent: number };

const RECORDS: RecordItem[] = Array.from({ length: 1000 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 150) + 20,
}));

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

const barColors = labels.map((_, i) => colors[i % colors.length]);  

  return (
    <>
     
      <style jsx global>{`
        .js-plotly-plot .modebar {
        display: flex !important;
          transform: scale(0.5);
          transform-origin: top right;
        }
      `}</style>

      <div className="flex-1 w-full overflow-auto">
        <Plot
          data={[
            {
              type: "bar",
              x: labels,
              y: values,
              marker: { color: barColors },
            //  text: labels,
              textposition: "auto",
              textangle: -90,
              textfont: { size: 12, color: "black" },
              customdata: percents,
              hovertemplate: "%{x}: %{y} (%{customdata:.1f}%)<extra></extra>",
            },
          ]}
          layout={
            {
              autosize: true,
              margin: { t: 50, b: 10, l: 10, r: 10 }, // increase top margin for modebar
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
            width: Math.max(labels.length * 10,100), 
            minWidth: "100%",
            height: "100%",
          }}
        />
      </div>
    </>
  );
}
