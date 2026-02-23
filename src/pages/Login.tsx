import { Form, Input, Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { getUser } from "../auth";

const { Title } = Typography;

const scheme = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const result = scheme.safeParse(values);

    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }

    const savedUser = getUser();

    if (!savedUser) {
      toast.error("Avval register qiling");
      navigate("/register");
      return;
    }

    if (
      savedUser.email === values.email &&
      savedUser.password === values.password
    ) {
      toast.success("Login successfully");
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Card style={{ width: 350 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Login
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;