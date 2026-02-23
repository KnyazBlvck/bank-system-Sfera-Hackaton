import { Form, Input, Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { setUser } from "../auth";

const { Title } = Typography;

const scheme = z.object({
  nickname: z.string().min(3).max(8),
  email: z.string().email(),
  password: z.string().min(6),
});

const Register = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const result = scheme.safeParse(values);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    setUser(values);
    toast.success("Registered Successfully");

    navigate("/login"); // MUHIM
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Card style={{ width: 350 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Register
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Nickname" name="nickname" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Register;