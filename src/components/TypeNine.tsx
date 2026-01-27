"use client";

import dynamic from "next/dynamic";
import type { Data, Layout, Config } from "plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function TypeNine() {
  const values: number[] = [
    120, 90, 79, 60, 150, 110, 95, 80, 70, 65, 140, 100, 85, 55, 55, 130, 105,
    98, 88, 50,
  ];

  const labels: string[] = [
    "Chrome",
    "Firefox",
    "Edge",
    "Safari",
    "Brave",
    "Opera",
    "Vivaldi",
    "Samsung Internet",
    "UC Browser",
    "Tor",
    "Internet Explorer",
    "DuckDuckGo",
    "Yandex",
    "Maxthon",
    "Pale Moon",
    "QQ Browser",
    "Sogou",
    "Baidu",
    "Whale",
    "Other",
  ];

  const data: Data[] = [
    {
      type: "pie",
      values,
      labels,
      textinfo: "percent",
      textposition: "inside",
      hoverinfo: "label+value+percent",
      pull: 0.035,
      domain: { x: [0, 1], y: [0.30, 1] },
    },
  ];

  const layout: Partial<Layout> = {
    margin: { t: 3, l: 10, r: 10, b: 10 },
    height: undefined,
    legend: {
      orientation: "h",
      x: 0.48,
      xanchor: "center",
      y: -0.5,
      yanchor: "bottom",
      font: { size: 7 },
      itemsizing: "constant",
      itemclick: "toggle",
      itemdoubleclick: "toggleothers",
    },
    paper_bgcolor: "lightgray",
  };

  const config: Partial<Config> = {
    displayModeBar: true,
    displaylogo: false,
  };

  return (
    <Plot
      data={data}
      layout={layout}
      config={config}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
