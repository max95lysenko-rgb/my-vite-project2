import React from "react";
import { Layout, Card, Typography, Space } from "antd";
import { Outlet } from "react-router-dom";
import { GithubOutlined, BuildOutlined } from "@ant-design/icons";

const { Content, Footer } = Layout;
const { Text, Title } = Typography;

const AuthLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <Space align="center">
            <BuildOutlined style={{ fontSize: "28px", color: "#1677ff" }} />
            <Title level={4} style={{ margin: 0, fontFamily: "monospace" }}>
              max95lysenko-rgb /{" "}
              <span style={{ color: "#1677ff" }}>project2</span>
            </Title>
          </Space>
        </div>

        <Card
          style={{
            width: "100%",
            maxWidth: 420,
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            border: "1px solid #e8e8e8",
          }}
          styles={{ body: { padding: "40px 32px" } }}
        >
          <Outlet />
        </Card>

        <Footer
          style={{
            background: "transparent",
            textAlign: "center",
            marginTop: 24,
          }}
        >
          <Text type="secondary" style={{ fontSize: "12px" }}>
            © {new Date().getFullYear()} Created for Vite + AntDesign Study
          </Text>
        </Footer>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
