import React from 'react';
import { Layout, Card } from 'antd';
import styles from './AuthPage.module.css';

const { Content } = Layout;

export const AuthPage: React.FC = () => {
  return (
    <Layout className={styles.authLayout}>
      <Content className={styles.content}>
        <Card 
          className={styles.authCard}
          bordered={false}
        >
          <div className={styles.cardHeader}>
            <h1>Вход / Регистрация</h1>
            <p className={styles.subtitle}>Добро пожаловать</p>
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default AuthPage;