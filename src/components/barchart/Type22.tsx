"use client";

import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

type BarChartProps = {
  x: string[] | number[];
  y: number[] | string[];
  name?: string;
  orientation?: "v" | "h";
};

export default function Type22({
  x,
  y,
  name = "Series 1",
  orientation = "v",
}: BarChartProps) {
  return (
    <Plot
      data={[
        {
          type: "bar",
          x,
          y,
          orientation,
          name,

          marker: {
            color: "#4f46e5",
            line: {
              color: "#ffffff",
              width: 1,
            },
          },

          opacity: 1,
          width: 0.6,
     //     text:y,
          textposition: "inside",
          textangle:-90,
          insidetextanchor: "middle",

          hoverinfo: "x+y+name",
        },
      ]}
      layout={{
        barmode: "group",
        bargap: 0.2,
        bargroupgap: 0.1,

        margin: {
          t: 20,
          l: 40,
          r: 20,
          b: 40,
        },

        xaxis: {
          title: {
            text: orientation === "h" ? "Categories" : "Values",
          },
          tickangle: 0,
          tickfont: { size: 10 },
          showgrid: false,
          zeroline: true,
          automargin: true,
          categoryorder: "trace",
        },

        yaxis: {
          title: {
            text: orientation === "h" ? "Values" : "Categories",
          },
          tickfont: { size: 10 },
          showgrid: true,
          gridcolor: "#e5e7eb",
          zeroline: false,
          automargin: true,
        },

        plot_bgcolor: "lightgray",
        paper_bgcolor: "#f3f4f6",

        showlegend: true,
        legend: {
          orientation: "h",
          x: 1,
          y: 1,
          xanchor: "left",
          yanchor: "top",
        },
      }}
      config={{
        displayModeBar: true,
        responsive: true,
      }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
