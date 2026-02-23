import { Stock } from "@ant-design/plots";

export const DemoStock = () => {
const data = [
  // 1-blok (original)
  { date: "2017-11-17", open: 171.03, high: 171.38, low: 169.63, close: 170.15 },
  { date: "2017-11-20", open: 170.29, high: 170.55, low: 169.55, close: 169.98 },
  { date: "2017-11-21", open: 170.77, high: 173.69, low: 170.77, close: 173.14 },
  { date: "2017-11-22", open: 173.36, high: 175.00, low: 173.05, close: 174.96 },
  { date: "2017-11-24", open: 175.10, high: 175.50, low: 174.64, close: 174.97 },
  { date: "2017-11-27", open: 175.05, high: 175.08, low: 173.33, close: 174.09 },
  { date: "2017-11-28", open: 174.30, high: 174.86, low: 171.86, close: 173.07 },
  { date: "2017-11-29", open: 172.63, high: 172.91, low: 167.16, close: 169.48 },
  { date: "2017-11-30", open: 170.42, high: 172.13, low: 168.44, close: 171.85 },
  { date: "2017-12-01", open: 169.94, high: 171.66, low: 168.50, close: 171.05 },

  // 2-blok (biroz o‘sish bilan)
  { date: "2017-12-02", open: 171.03, high: 172.75, low: 168.27, close: 170.15 },
  { date: "2017-12-03", open: 170.80, high: 172.43, low: 168.70, close: 170.49 },
  { date: "2017-12-04", open: 171.79, high: 176.13, low: 170.42, close: 174.18 },
  { date: "2017-12-05", open: 174.92, high: 177.99, low: 173.21, close: 176.53 },
  { date: "2017-12-06", open: 177.20, high: 179.03, low: 175.32, close: 177.07 },
  { date: "2017-12-07", open: 177.68, high: 179.13, low: 174.52, close: 176.70 },
  { date: "2017-12-08", open: 177.44, high: 179.43, low: 173.55, close: 176.19 },
  { date: "2017-12-09", open: 176.26, high: 177.95, low: 169.30, close: 173.04 },
  { date: "2017-12-10", open: 174.51, high: 177.67, low: 171.10, close: 175.97 },
  { date: "2017-12-11", open: 174.53, high: 177.71, low: 171.67, close: 175.67 },

  // 3-blok (yana o‘sish bilan)
  { date: "2017-12-12", open: 184.71, high: 186.57, low: 181.73, close: 183.76 },
  { date: "2017-12-13", open: 184.42, high: 186.18, low: 182.15, close: 184.09 },
  { date: "2017-12-14", open: 185.46, high: 190.14, low: 183.97, close: 188.03 },
  { date: "2017-12-15", open: 188.79, high: 192.10, low: 186.94, close: 190.53 },
  { date: "2017-12-16", open: 191.21, high: 193.18, low: 189.18, close: 191.07 },
  { date: "2017-12-17", open: 191.68, high: 193.25, low: 188.28, close: 190.63 },
  { date: "2017-12-18", open: 191.38, high: 193.53, low: 187.19, close: 190.03 },
  { date: "2017-12-19", open: 190.07, high: 191.90, low: 182.57, close: 186.60 },
  { date: "2017-12-20", open: 188.14, high: 191.55, low: 184.47, close: 189.72 },
  { date: "2017-12-21", open: 188.12, high: 191.55, low: 185.04, close: 189.35 },
];
  const config = {
    data,
    xField: "date",
    yField: ["open", "close", "low", "high"],           
    colorField: (d) => {
      const trend = Math.sign(d.close - d.open);
      return trend > 0 ? "Up" : trend === 0 ? "No Change" : "Down";
    },
    scale: {
      color: {
        domain: ["Down", "No Change", "Up"],
        range: ["#e41a1c", "#999999", "#4daf4a"],     
      },
    },
    lineStyle: {
      stroke: "#4444",
    },
    axis: {
      x: {
        labelAutoRotate: false,
        transform: [
          {
            type: "hide",
            keepHeader: true,
            keepTail: true,
          },
        ],
      },
    },
    tooltip: {
      title: (d) => d.date,
      items: [
        { field: "open", name: "Open" },
        { field: "close", name: "Close" },
        { field: "low", name: "Low" },
        { field: "high", name: "High" },
      ],
    },
  };

  return <Stock {...config} />;
};