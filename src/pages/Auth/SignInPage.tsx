import React from "react";
import { Form, Input, Button, Checkbox, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const SignInPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Данные входа:", values);
    message.success("Успешный вход!");
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          Вход
        </Title>
        <Text type="secondary">Добро пожаловать в проект!</Text>
      </div>

      <Form
        form={form}
        name="login_form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Введите ваш Email!" },
            { type: "email", message: "Некорректный формат Email!" },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль!" }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Запомнить</Checkbox>
            </Form.Item>
            <a href="#" style={{ fontSize: "14px" }}>
              Забыли пароль?
            </a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ borderRadius: "8px" }}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center" }}>
        <Text type="secondary">
          Нет аккаунта? <Link to="/auth/sign-up">Зарегистрироваться</Link>
        </Text>
      </div>
    </>
  );
};

export default SignInPage;
