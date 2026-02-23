import { Pie } from "@ant-design/plots";

const PieCharts = () => {
  const PieData = [
    { name: "<5", value: 199130443 },
    { name: "5-9", value: 205301982 },
    { name: "10-14", value: 20679786 },
    { name: "15-19", value: 21354481 },
    { name: "20-24", value: 226304232 },
    { name: "25-29", value: 21698010 },
    { name: "30-34", value: 21183639 },
    { name: "35-39", value: 198355782 },
    { name: "40-44", value: 20796128 },
    { name: "45-49", value: 21370368 },
    { name: "50-54", value: 22525490 },
    { name: "55-59", value: 210019427 },
    { name: "60-64", value: 184156813 },
    { name: "65-69", value: 145474413 },
    { name: "70-74", value: 105877231 },
    { name: "75-79", value: 77320129 },
    { name: "80-84", value: 58114329 },
    { name: "≥85", value: 59383752 },

  ];

  const config = {
    data: {
      value: PieData,
    },
    angleField: "value",
    colorField: "name",
    legend: false,
    innerRadius: 0.6,
    labels: [
      { text: "name", style: { fontSize: 10, fontWeight: "bold" } },
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ""),
        style: {
          fontSize: 9,
          dy: 12,
        },
      },
    ],
    style: {
      stroke: "#fff",
      inset: 1,
      radius: 10,
    },
    scale: {
      color: {
        palette: "spectral",
        offset: (t) => t * 0.8 + 0.1,
      },
    },
  };
  return (
    <>
      <Pie {...config} />
    </>
  );
};

export default PieCharts;
