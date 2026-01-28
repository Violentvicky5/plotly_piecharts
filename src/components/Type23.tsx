"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

type PieChartProps = {
  values: number[];
  labels: string[];
};

export default function Type23({ values, labels }: PieChartProps) {
  return (
    <Plot
      data={[
        {
          type: "pie",
          values,
          labels,
          textinfo: "percent",
          textposition: "inside",
          hoverinfo: "label+value+percent",
          pull: 0.035,
          domain: { x: [0, 1], y: [0.3, 1] },
          showlegend: true,
        },
      ]}
      layout={{
        margin: { t: 10, l: 10, r: 10, b: 10 },
        height: undefined,
        legend: {
          orientation: "h",
          x: 0.5,
          y: 0,
          xanchor: "center",
          yanchor: "top",
          font: { size: 7 },
          itemsizing: "constant",
          itemclick: "toggle",
          itemdoubleclick: "toggleothers",
        },
        paper_bgcolor: "lightgray",
      }}
      config={{
        displayModeBar: true,
        displaylogo: false,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
