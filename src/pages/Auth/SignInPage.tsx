import React from "react";
import { Form, Input, Button, Typography, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const { Title, Text } = Typography;

// 1. Создаем схему валидации
const signInSchema = z.object({
  email: z.string().min(1, "Введите почту").email("Некорректный формат почты"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
  remember: z.boolean().optional(),
});

// Генерируем тип из схемы
type SignInValues = z.infer<typeof signInSchema>;

const SignInPage: React.FC = () => {
  // 2. Инициализируем форму
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const onFinish = (values: SignInValues) => {
    console.log("Данные (Zod + RHF):", values);
    message.success("Успешный вход!");
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Title level={3}>Вход</Title>
        <Text type="secondary">Использование RHF + Zod</Text>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onFinish)} size="large">
        {/* Email поле */}
        <Form.Item
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} prefix={<UserOutlined />} placeholder="Email" />
            )}
          />
        </Form.Item>

        {/* Пароль поле */}
        <Form.Item
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...field}
                prefix={<LockOutlined />}
                placeholder="Пароль"
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Controller
            name="remember"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox checked={value} onChange={onChange}>
                Запомнить меня
              </Checkbox>
            )}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={isSubmitting}>
          Войти
        </Button>
      </Form>

      <Divider />
      <div style={{ textAlign: "center" }}>
        <Link to="/auth/sign-up">Зарегистрироваться</Link>
      </div>
    </>
  );
};

export default SignInPage;
