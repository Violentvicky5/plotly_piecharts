"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type RecordItem = { label: string; value: number };

const RECORDS: RecordItem[] = Array.from({ length: 1000 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 150) + 20,
}));

const COLORS = [
  "#636efa", "#EF553B", "#00cc96", "#ab63fa", "#FFA15A",
  "#19d3f3", "#FF6692", "#B6E880", "#FF97FF", "#FECB52",
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
  "#4c78a8", "#f58518", "#54a24b", "#e45756", "#72b7b2",
];

export default function TypeScalableChart() {
  const labels = useMemo(() => RECORDS.map(r => r.label), []);
  const values = useMemo(() => RECORDS.map(r => r.value), []);
  const total = useMemo(() => values.reduce((s, v) => s + v, 0), [values]);
  const percents = useMemo(() => values.map(v => ((v / total) * 100).toFixed(1)), [values, total]);
  const xNumeric = labels.map((_, i) => i);
  const colors = labels.map((_, i) => COLORS[i % COLORS.length]);

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden" style={{ height: 300 }}>
      <Plot
        data={labels.map((_, i) => ({
          type: "scatter",
          mode: "lines+markers",
          x: [xNumeric[i], xNumeric[i]],   //two numbers, not array
          y: [0, values[i]],
          line: { width: 5, color: colors[i] },
          marker: { size: 7, color: colors[i] },
          customdata: [percents[i], percents[i]],
          hovertemplate: "<b>%{x}</b><br>Value: %{y}<br>Percent: %{customdata[0]}%<extra></extra>",
        }))}
        layout={{
          autosize: true,
       
          margin: { t: 20, b: 20, l: 40, r: 40 },
          paper_bgcolor: "#f3f3f3",
          plot_bgcolor: "#f3f3f3",
          showlegend: false,
          xaxis: {
            tickvals: xNumeric,
           ticktext: labels,
             showticklabels: false, 
            tickangle: -90,                
            showgrid: false,
            zeroline: false,
            range: [-0.5, labels.length - 0.5], 
          },
          yaxis: { zeroline: false, showgrid: true, tickfont: { size: 7, color: "black" } },
          annotations: labels.map((l, i): Partial<Plotly.Annotations> => ({
            x: xNumeric[i],               
            y: values[i] + 2,
            text: l,
            showarrow: false,
            textangle: "-90",              
            font: { size: 6, color: "black" },
            xanchor: "center",
            yanchor: "bottom",
          })),
        }}
        config={{ responsive: true, displayModeBar: true, displaylogo: false }}
        style={{ width: Math.max(labels.length * 20, 600), height: "100%" }}
      />
    </div>
  );
}
