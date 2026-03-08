import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

// Схема регистрации
const signUpSchema = z
  .object({
    email: z.string().min(1, "Почта обязательна").email("Неверный формат"),
    password: z.string().min(8, "Минимум 8 символов"),
    confirmPassword: z.string().min(1, "Подтвердите пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"], // Ошибка привяжется к полю confirmPassword
  });

type SignUpValues = z.infer<typeof signUpSchema>;

const SignUpPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onFinish = (values: SignUpValues) => {
    console.log("Зарегистрирован:", values);
    message.success("Аккаунт создан!");
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Title level={3}>Регистрация</Title>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onFinish)} size="large">
        <Form.Item
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Email" />}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Пароль" />
            )}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.confirmPassword ? "error" : ""}
          help={errors.confirmPassword?.message}
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Повторите пароль" />
            )}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Создать аккаунт
        </Button>
      </Form>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Link to="/auth/sign-in">Уже есть аккаунт? Войти</Link>
      </div>
    </>
  );
};

export default SignUpPage;
