import { Card, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { translations } from "../translate";
import { useUserStore } from "../store/useUserStore";

export default function Home() {
  const { lang } = useUserStore();
  const t = translations[lang] || translations.en;

  return (
    <Card className="panel">
      <h1>{t.home.title}</h1>
      <p className="muted">{t.home.subtitle}</p>
      <Space>
        <Link to="/notice"><Button>{t.home.ctaReminder}</Button></Link>
        <Link to="/quiz"><Button type="primary">{t.home.ctaQuiz}</Button></Link>
      </Space>
    </Card>
  );
}