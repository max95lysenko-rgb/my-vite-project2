import React from "react";
import { Form, Input, Button, Checkbox, Typography, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const SignUpPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Данные регистрации:", values);
    message.success("Регистрация прошла успешно!");
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>
          Регистрация
        </Title>
        <Text type="secondary">Создайте аккаунт, чтобы начать</Text>
      </div>

      <Form
        name="register_form"
        layout="vertical"
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="nickname"
          rules={[
            { required: true, message: "Как вас зовут?", whitespace: true },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Имя пользователя"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Введите Email!" },
            { type: "email", message: "Некорректный Email!" },
          ]}
        >
          <Input
            prefix={<MailOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Придумайте пароль!" },
            { min: 6, message: "Минимум 6 символов!" },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Пароль"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Подтвердите пароль!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "#bfbfbf" }} />}
            placeholder="Повторите пароль"
          />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Нужно принять соглашение")),
            },
          ]}
        >
          <Checkbox>
            Я согласен с <a href="#">правилами</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ borderRadius: "8px" }}
          >
            Создать аккаунт
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center" }}>
        <Text type="secondary">
          Уже есть аккаунт? <Link to="/auth/sign-in">Войти</Link>
        </Text>
      </div>
    </>
  );
};

export default SignUpPage;
