import React from "react";
import { Typography, Button, Divider } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const SignUpPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Title level={2} style={{ marginBottom: 8 }}>
        Регистрация
      </Title>
      <Text type="secondary">Присоединяйтесь к нашему проекту</Text>
      <div
        style={{
          height: "240px",
          background: "#fafafa",
          border: "2px dashed #f0f0f0",
          borderRadius: "12px",
          margin: "32px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text type="secondary">Здесь будет форма регистрации</Text>
      </div>

      <Button
        type="primary"
        size="large"
        block
        style={{ borderRadius: "8px", background: "#52c41a" }}
      >
        Зарегистрироваться
      </Button>

      <Divider plain>
        <Text style={{ color: "#ccc", fontSize: "12px" }}>
          УЖЕ ЕСТЬ АККАУНТ?
        </Text>
      </Divider>

      <Link to="/auth/sign-in">Вернуться ко входу</Link>
    </div>
  );
};

export default SignUpPage;
