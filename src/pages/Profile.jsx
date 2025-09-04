import { Card, Descriptions, Result } from "antd";
import { translations } from "../translate";
import { useUserStore } from "../store/useUserStore";
import { useScoreStore } from "../store/useScoreStore";

export default function Profile() {
  const { user, lang, hasAttempt } = useUserStore();
  const { score } = useScoreStore();
  const t = translations[lang] || translations.en;

  if (!user) {
    return <Result title={t.profile.title} subTitle={t.quiz.needLogin} />;
  }

  return (
    <Card className="panel" style={{ maxWidth: 720, margin: "0 auto" }}>
      <h1>{t.profile.title}</h1>
      <Descriptions column={1} bordered style={{ marginTop: 12 }}>
        <Descriptions.Item label={t.profile.name}>{user.name}</Descriptions.Item>
        <Descriptions.Item label={t.profile.email}>{user.email}</Descriptions.Item>
        <Descriptions.Item label={t.profile.score}>{score}</Descriptions.Item>
        <Descriptions.Item label={t.profile.attempt}>{hasAttempt ? t.profile.yes : t.profile.no}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
