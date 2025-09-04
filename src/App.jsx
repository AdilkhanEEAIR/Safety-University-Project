import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Notice from "./pages/Notice";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import LoginRegister from "./pages/LoginRegister";
import Profile from "./pages/Profile";
import { useUserStore } from "./store/useUserStore";
import { translations } from "./translate";

const { Content } = Layout;

export default function App() {
  const { lang } = useUserStore();
  const t = translations[lang] || translations.en;

  useEffect(() => {
    document.title = t.appTitle;
  }, [t.appTitle]);


  return (
      <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Content className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/auth" element={<LoginRegister />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}