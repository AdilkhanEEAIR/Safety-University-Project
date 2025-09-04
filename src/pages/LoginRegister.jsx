import { Card, Tabs, Form, Input, Button, message } from "antd";
import { translations } from "../translate";
import { useUserStore } from "../store/useUserStore";

export default function LoginRegister() {
  const { lang, register, login } = useUserStore();
  const t = translations[lang] || translations.en;

  const validate = (email) => email.toLowerCase().endsWith("@alatoo.edu.kg");

  const onRegister = ({ name, email }) => {
    if (!validate(email)) return message.error(t.auth.uniOnly);
    register(name.trim(), email.trim().toLowerCase());
    message.success(`${t.auth.welcome}, ${name}!`);
  };

  const onLogin = ({ name, email }) => {
    if (!validate(email)) return message.error(t.auth.uniOnly);
    login(name.trim(), email.trim().toLowerCase());
    message.success(t.auth.loggedIn);
  };

  return (
    <Card className="panel" style={{ maxWidth: 520, margin: "0 auto" }}>
      <h1>{t.auth.title}</h1>
      <Tabs
        items={[
          {
            key: "register",
            label: t.nav.register,
            children: (
              <Form layout="vertical" onFinish={onRegister}>
                <Form.Item label={t.auth.name} name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label={t.auth.email} name="email" rules={[{ required: true, type: "email" }]}>
                  <Input placeholder="user.name@alatoo.edu.kg" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {t.auth.registerBtn}
                </Button>
              </Form>
            ),
          },
          {
            key: "login",
            label: t.nav.login,
            children: (
              <Form layout="vertical" onFinish={onLogin}>
                <Form.Item label={t.auth.name} name="name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item label={t.auth.email} name="email" rules={[{ required: true, type: "email" }]}>
                  <Input placeholder="user.name@alatoo.edu.kg" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {t.auth.loginBtn}
                </Button>
              </Form>
            ),
          },
        ]}
      />
    </Card>
  );
}