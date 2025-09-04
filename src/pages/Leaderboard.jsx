import { Card, Table, Empty } from "antd";
import { useUserStore } from "../store/useUserStore";
import { translations } from "../translate";

export default function Leaderboard() {
  const { leaderboard, lang } = useUserStore();
  const t = translations[lang] || translations.en;

  const data = [...leaderboard].sort((a, b) => b.score - a.score).map((x, i) => ({ key: i, ...x }));

  const columns = [
    { title: "#", dataIndex: "rank", key: "rank", render: (_, __, idx) => idx + 1, width: 60 },
    { title: t.leaderboard.name, dataIndex: "name", key: "name" },
    { title: t.leaderboard.score, dataIndex: "score", key: "score", width: 120 },
    { title: t.leaderboard.date, dataIndex: "date", key: "date", width: 180 },
  ];

  return (
    <Card className="panel">
      <h1>{t.leaderboard.title}</h1>
      {data.length ? (
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
      ) : (
        <Empty description={t.leaderboard.empty} />
      )}
    </Card>
  );
}
