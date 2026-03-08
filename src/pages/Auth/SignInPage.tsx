import React from "react";
import { Typography, Button, Divider } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const SignInPage: React.FC = () => {
  return (
    <>
      <Title level={3} style={{ marginTop: 0 }}>
        Вход
      </Title>
      <Text type="secondary">Введите учетные данные для доступа</Text>

      <div
        style={{
          height: 200,
          background: "#fafafa",
          border: "1px dashed #d9d9d9",
          borderRadius: 8,
          margin: "24px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text type="secondary">Форма входа появится здесь</Text>
      </div>

      <Button type="primary" block size="large">
        Войти
      </Button>
      <Divider />
      <div style={{ textAlign: "center" }}>
        <Text type="secondary">Нет аккаунта? </Text>
        <Link to="/auth/sign-up">Зарегистрироваться</Link>
      </div>
    </>
  );
};

export default SignInPage;
