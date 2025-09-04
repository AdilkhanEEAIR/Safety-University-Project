import { Layout } from "antd";
import { useUserStore } from "../store/useUserStore";
import { translations } from "../translate";

const { Footer: AntFooter } = Layout;

export default function Footer() {
  const { lang } = useUserStore();
  const t = translations[lang] || translations.en;

  return (
    <AntFooter className="footer">
      <div>© {new Date().getFullYear()} IT Faculty — {t.footer.authors}: A.T., B.K. · {t.footer.coauthors}: C.D.</div>
    </AntFooter>
  );
}
