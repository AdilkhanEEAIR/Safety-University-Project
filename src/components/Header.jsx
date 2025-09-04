import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Badge, Button, Drawer, Space } from "antd";
import {
  HomeOutlined,
  ReadOutlined,
  TrophyOutlined,
  ExperimentOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import { useUserStore } from "../store/useUserStore";
import { useScoreStore } from "../store/useScoreStore";
import { translations } from "../translate";

const { Header: AntHeader } = Layout;

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, logout, lang } = useUserStore();
  const { score, resetScore } = useScoreStore();
  const t = translations[lang] || translations.en;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1185);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1185);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (drawerOpen) setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isAuth && location.pathname.startsWith("/auth")) {
      navigate("/");
    }
  }, [isAuth, location.pathname, navigate]);

  const selected = (() => {
    if (location.pathname.startsWith("/notice")) return ["notice"];
    if (location.pathname.startsWith("/quiz")) return ["quiz"];
    if (location.pathname.startsWith("/leaderboard")) return ["leaderboard"];
    if (location.pathname.startsWith("/profile")) return ["profile"];
    if (location.pathname.startsWith("/auth")) return ["auth"];
    return ["home"];
  })();

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/">{t.nav.home}</Link>,
    },
    {
      key: "notice",
      icon: <ReadOutlined />,
      label: <Link to="/notice">{t.nav.notice}</Link>,
    },
    {
      key: "quiz",
      icon: <ExperimentOutlined />,
      label: <Link to="/quiz">{t.nav.quiz}</Link>,
    },
    {
      key: "leaderboard",
      icon: <TrophyOutlined />,
      label: <Link to="/leaderboard">{t.nav.leaderboard}</Link>,
    },
  ];

  const handleLogout = () => {
    logout();
    resetScore();
    setDrawerOpen(false);
    navigate("/");
  };

  return (
    <AntHeader
      className="app-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 12px",
      }}
    >
      <div
        className="app-title"
        style={{
          color: "#fff",
          fontWeight: 700,
          letterSpacing: 0.3,
          fontSize: window.innerWidth <= 300 ? 14 : 18,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: window.innerWidth <= 300 ? "70%" : "100%",
        }}
      >
        {t.appTitle}
      </div>

      {isMobile ? (
        <>
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 22, color: "#f0f0f0" }} />}
            onClick={() => setDrawerOpen(true)}
          />

          <Drawer
            title={t.appTitle}
            placement="right"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            bodyStyle={{ padding: 0 }}
          >
            <Menu
              mode="vertical"
              selectedKeys={selected}
              items={menuItems}
              style={{ border: "none" }}
              onClick={() => setDrawerOpen(false)}
            />

            <Space
              direction="vertical"
              style={{ margin: "16px", width: "100%" }}
            >
              <Space align="center" size={8}>
                <span>{t.leaderboard.score}:</span>
                <Badge count={score} color="#3b82f6" />
              </Space>

              <LanguageSelector />

              {isAuth ? (
                <>
                  <Link to="/profile">
                    <Button icon={<UserOutlined />} block>
                      {t.nav.profile}
                    </Button>
                  </Link>
                  <Button
                    danger
                    icon={<LogoutOutlined />}
                    block
                    onClick={handleLogout}
                  >
                    {t.nav.logout}
                  </Button>
                </>
              ) : (
                <Link to="/auth">
                  <Button type="primary" icon={<LoginOutlined />} block>
                    {t.nav.login}
                  </Button>
                </Link>
              )}
            </Space>
          </Drawer>
        </>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={selected}
            items={menuItems}
            style={{ background: "transparent" }}
          />

          <Space align="center" size={8}>
            <span style={{ color: "#fff" }}>{t.leaderboard.score}:</span>
            <Badge count={score} color="#3b82f6" />
          </Space>

          <LanguageSelector />
          <Space>
            {isAuth ? (
              <>
                <Link to="/profile">
                  <Button icon={<UserOutlined />}>{t.nav.profile}</Button>
                </Link>
                <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
                  {t.nav.logout}
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button type="primary" icon={<LoginOutlined />}>
                  {t.nav.login}
                </Button>
              </Link>
            )}
          </Space>
        </div>
      )}
    </AntHeader>
  );
}