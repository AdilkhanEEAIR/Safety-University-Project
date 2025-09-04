import { Card, Divider } from "antd";
import { useUserStore } from "../store/useUserStore";
import { translations } from "../translate";

export default function Notice() {
  const { lang } = useUserStore();
  const t = translations[lang] || translations.en;
  const s = t.notice.sections;
  const r = t.notice.rules;

  const Block = ({ title, items }) => (
    <Card className="panel" style={{ marginBottom: 16 }}>
      <h2>{title}</h2>
      <ul className="muted" style={{ lineHeight: 1.7, paddingLeft: 18 }}>
        {items.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    </Card>
  );

  return (
    <>
      <Card className="panel" style={{ marginBottom: 16 }}>
        <h1>{t.notice.title}</h1>
        <Divider />
        <div className="muted">IT Lab · Fire & Safety Guidelines</div>
      </Card>

      <Block title={s.general} items={r.general} />
      <Block title={s.fire} items={r.fire} />
      <Block title={s.electrical} items={r.electrical} />
      <Block title={s.chemical} items={r.chemical} />
      <Block title={s.emergency} items={r.emergency} />
    </>
  );
}
