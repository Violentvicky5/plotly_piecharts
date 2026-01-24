"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type Item = {
  label: string;
  value: number;
  percent: number;
};

export default function TypeTen() {
  const [chartReady, setChartReady] = useState(false);

  const values: number[] = [
    120, 90, 79, 60, 150, 110, 95, 80, 70, 65, 140, 100, 85, 55, 55, 130, 105,
    98, 88, 70,
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
    "IExplorer",
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

  const data = useMemo(
    () =>
      labels.map((label, index) => ({
        label,
        value: values[index] ?? 0,
      })),
    [labels, values],
  );

  const total = useMemo(
    () => data.reduce((sum, d) => sum + d.value, 0),
    [data],
  );

  const enriched: Item[] = useMemo(() => {
    return data
      .map((d) => ({
        ...d,
        percent: total ? (d.value / total) * 100 : 0,
      }))
      .sort((a, b) => b.percent - a.percent);
  }, [data, total]);

  const [visible, setVisible] = useState<Set<string>>(
    () => new Set(enriched.map((d) => d.label)),
  );

  const toggle = (label: string) => {
    const next = new Set(visible);
    next.has(label) ? next.delete(label) : next.add(label);
    setVisible(next);
  };

  const visibleData = enriched.filter((d) => visible.has(d.label));

  const colors = useMemo(() => {
    const base = [
      "#636efa", // blue
      "#EF553B", // red
      "#00cc96", // green
      "#ab63fa", // purple
      "#FFA15A", // orange
      "#19d3f3", // light blue
      "#FF6692", // pink
      "#B6E880", // lime green
      "#FF97FF", // magenta
      "#FECB52", // yellow
      "#1f77b4", // dark blue
      "#ff7f0e", // dark orange
      "#2ca02c", // dark green
      "#d62728", // dark red
      "#9467bd", // violet
      "#8c564b", // brown
      "#e377c2", // light pink
      "#7f7f7f", // gray
      "#bcbd22", // olive
      "#17becf", // cyan
    ];

    return enriched.map((_, i) => base[i % base.length]); // to get enriched[i] for color
  }, [enriched]);

  return (
    <div className="w-full h-full flex flex-col">
      {/*plotly pie chart*/}
      <div className="flex-1 min-h-0">
        <Plot
          data={[
            {
              type: "pie",
              labels: visibleData.map((d) => d.label),
              values: visibleData.map((d) => d.value),
              text: visibleData.map((d) => `${d.percent.toFixed(1)}%`),
              textinfo: "text",
              textfont: { size: 6, color: "black" },
              insidetextorientation: "radial",
              pull: 0.03,
              hovertemplate: "%{label}: %{text}<extra></extra>",
              marker: {
                colors: colors.filter((_, i) => visible.has(enriched[i].label)),
              },
            },
          ]}
          layout={{
            height: 165,
            showlegend: false,
            margin: { t: 0, b: 0, l: 0, r: 0 },
            autosize: true,
            paper_bgcolor: "lightgray",
          }}
          config={{
            responsive: true,
            displayModeBar: false,
            displaylogo: false,
          }}
          style={{ width: "100%", height: "100%" }}
          onInitialized={() => setChartReady(true)}
          //onAfterPlot={()=>setChartReady(true)}
        />
      </div>

      {/*customm card legend  */}

      <div
        className={`flex justify-center items-center transition-opacity ${
          chartReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mt-2 grid grid-cols-2 gap-3 overflow-y-auto max-h-[80px]">
          {enriched.map((item, index) => {
            const active = visible.has(item.label);

            return (
              <button
                key={item.label}
                onClick={() => toggle(item.label)}
                className={`flex items-center gap-0.5 text-[8px]
                ${active ? "bg-white-100" : "opacity-40"}
              `}
              >
                <span
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="truncate">
                  {item.label} — {item.percent.toFixed(1)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
