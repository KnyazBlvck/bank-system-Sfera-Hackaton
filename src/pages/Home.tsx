import { Card } from "antd";
import { Content } from "antd/es/layout/layout";
import PieCharts from "../charts/PieCharts";
import AreaChart from "../charts/AreaChart";
import { DemoStock } from "../charts/DemoStock";
import { DemoColumn } from "../charts/DemoColumn";

const Home = () => {
  return (
    <Content className="max-w-[1200px] mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hoverable className="rounded-xl shadow-sm ">
          <AreaChart />
        </Card>

        <Card hoverable className="rounded-xl shadow-sm">
          <PieCharts />
        </Card>

        <Card hoverable className="rounded-xl shadow-sm">
          <DemoStock />
        </Card>

        <Card hoverable className="rounded-xl shadow-sm">
          <DemoColumn />
        </Card>
      </div>
    </Content>
  );
};

export default Home;
