"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { Layout } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type RecordItem = {
  label: string;
  value: number;
};

const RECORDS: RecordItem[] = Array.from({ length: 100 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 150) + 20,
})).sort((a, b) => b.value - a.value);



const COLORS = [
  "#636efa", "#EF553B", "#00cc96", "#ab63fa", "#FFA15A",
  "#19d3f3", "#FF6692", "#B6E880", "#FF97FF", "#FECB52",
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
  "#4c78a8", "#f58518", "#54a24b", "#e45756", "#72b7b2",
];

export default function Type20() {
  const labels = useMemo(() => RECORDS.map(r => r.label), []);
  const values = useMemo(() => RECORDS.map(r => r.value), []);

  const total = useMemo(
    () => values.reduce((s, v) => s + v, 0),
    [values]
  );

  const percents = useMemo(
    () => values.map(v => ((v / total) * 100).toFixed(1)),
    [values, total]
  );

  const xNumeric = labels.map((_, i) => i);

  const barColors = useMemo(
    () => labels.map((_, i) => COLORS[i % COLORS.length]),
    [labels]
  );

  return (
    <div
      className="w-full overflow-x-auto overflow-y-hidden"
      style={{ height: 300 }}
    >
      <Plot
        data={[
          {
            type: "bar",
            x: xNumeric,
            y: values,
            width: 0.8,
            marker: {
              color: barColors,
            },
            customdata: labels.map((label, i) => [
              label,
              percents[i],
            ]),
            hovertemplate:
              "<b>%{customdata[0]}</b><br>" +
              "Value: %{y}<br>" +
              "Percent: %{customdata[1]}%<extra></extra>",
          },
        ]}
        layout={
          {
            autosize: false,
            height: 300,
            margin: { t: 20, b: 40, l: 40, r: 20 },
            paper_bgcolor: "#f3f3f3",
            plot_bgcolor: "#f3f3f3",
            showlegend: false,
            xaxis: {
              tickvals: xNumeric,
//              ticktext: labels,
          //    tickangle: -90,
          //    tickfont: { size: 8 },
              showgrid: true,
              zeroline: false,
            },
            yaxis: {
              tickfont: { size: 8 },
              showgrid: true,
              zeroline: false,
            },
          } as Partial<Layout>
        }
        config={{
          responsive: false,
          displayModeBar: true,
        }}
        style={{
         
          width: Math.max(labels.length * 5, 600),
          height: "100%",
        }}
      />
    </div>
  );
}
