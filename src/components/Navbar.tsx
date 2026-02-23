import { Avatar, Dropdown, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { logout, getUser } from "../auth";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleMenuClick = ({ key }) => {
    if (key === "2") {
      logout();
      navigate("/login");
    }
  };

  const items = [
    {
      key: "1",
      label: "Sozlamalar",
      icon: <FiSettings size={18} />,
    },
    { type: "divider" },
    {
      key: "2",
      label: "Log Out",
      icon: <LuLogOut size={18} />,
      danger: true,
    },
  ];

  return (
    <Layout className="flex justify-end">
      <Header>
        <Dropdown menu={{ items, onClick: handleMenuClick }}>
          <div className="w-fit flex items-center gap-2 cursor-pointer">
            <Avatar icon={<FaRegUser />} />
            <span className="text-white font-semibold">
              {user?.nickname || "User"}
            </span>
          </div>
        </Dropdown>
      </Header>
    </Layout>
  );
};

export default Navbar;