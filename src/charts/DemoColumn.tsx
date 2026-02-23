import { Column } from "@ant-design/plots";
import { useEffect, useRef } from "react";

export const DemoColumn = () => {
  const data = [
    { city: "Beijing", sales: 376814.9 },
    { city: "Shanghai", sales: 582450.56 },
    { city: "Guangzhou", sales: 118154.07 },
    { city: "Shenzhen", sales: 144801.94 },
    { city: "Tianjin", sales: 471183.5 },
    { city: "Chengdu", sales: 137112.39 },
    { city: "Wuhan", sales: 115788.28 },
    { city: "Hangzhou", sales: 82420.54 },
    { city: "Nanjing", sales: 83000.06 },
    { city: "Harbin", sales: 205688.23 },
  ];

  const chartRef = useRef();
  useEffect(() => {
    console.log({ chartRef });
    if (chartRef.current) {
        console.log('succes');
        
    }
  }, []);
  const config = {
    data: {
      value: data,
    },
    xField: "city",
    yField: "sales",
    slider: {
      x: {
        values: [0.1, 0.8],
      },
    },
  };
  return <Column {...config} ref={chartRef} />;
};
