import { Select } from "antd";
import { useUserStore } from "../store/useUserStore";
import { translations } from "../translate";

export default function LanguageSelector() {
  const { lang, setLang } = useUserStore();
  const t = translations[lang] || translations.en;

  const options = Object.keys(translations).map((k) => ({
    value: k,
    label: t.langs[k],
  }));

  return (
    <Select
      value={lang}
      onChange={setLang}
      options={options}
      style={{ width: 150 }}
    />
  );
}