import { useEffect, useMemo, useState } from "react";
import { Card, Button, Radio, Space, message, Result } from "antd";
import { useUserStore } from "../store/useUserStore";
import { useScoreStore } from "../store/useScoreStore";
import { translations } from "../translate";
import { QUIZZES } from "../Quizes";

const QUESTION_TIME = 30;

export default function Quiz() {
  const { user, lang, hasAttempt, markAttempt, pushLeaderboard } = useUserStore();
  const { score, addScore, resetScore } = useScoreStore();
  const t = translations[lang] || translations.en;

  const baseQuestions = useMemo(() => QUIZZES[lang] || QUIZZES.en, [lang]);
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [time, setTime] = useState(QUESTION_TIME);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    let timer;
    if (started && !finished) {
      timer = setInterval(() => {
        setTime((s) => {
          if (s <= 1) {
            handleAnswer(-1);
            return QUESTION_TIME;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, finished, idx]);

  if (!user) {
    return <Result title={t.quiz.title} subTitle={t.quiz.needLogin} />;
  }
  if (hasAttempt) {
    return <Result status="success" title={t.quiz.title} subTitle={t.quiz.alreadyTook(score)} />;
  }

  const handleAnswer = (optionIndex) => {
    const q = questions[idx];
    const correct = optionIndex === q.correctIndex;
    if (correct) {
      addScore(10);
      message.success(t.quiz.correct);
    } else {
      message.error(t.quiz.wrong);
    }

    setPicked(null);
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setTime(QUESTION_TIME);
    } else {
      setFinished(true);
      markAttempt();
      pushLeaderboard({
        name: user.name,
        email: user.email,
        score: score + (correct ? 10 : 0),
      });
    }
  };

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const startQuiz = () => {
    resetScore();
    setIdx(0);
    setTime(QUESTION_TIME);
    setPicked(null);
    setStarted(true);
    setFinished(false);
    setQuestions(shuffle(baseQuestions)); 
  };

  if (!started) {
    return (
      <Card className="panel" style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1>{t.quiz.title}</h1>
        <Button type="primary" onClick={startQuiz}>
          {t.quiz.start}
        </Button>
      </Card>
    );
  }

  if (finished) {
    return (
      <Card className="panel" style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1>
          {t.quiz.final}: {score}
        </h1>
      </Card>
    );
  }

  const q = questions[idx];

  return (
    <Card className="panel" style={{ maxWidth: 800, margin: "0 auto" }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div className="muted">
          {t.quiz.timeLeft}: {time} {t.quiz.seconds}
        </div>
        <h2>
          {t.quiz.question} {idx + 1}/{questions.length}
        </h2>

        <div className="muted">{q.text}</div>

        <Radio.Group
          onChange={(e) => setPicked(e.target.value)}
          value={picked}
          style={{ display: "block" }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {q.options.map((opt, i) => (
              <Radio key={i} value={i}>
                {opt}
              </Radio>
            ))}
          </Space>
        </Radio.Group>

        <div>
          <Button
            type="primary"
            onClick={() => handleAnswer(picked)}
            disabled={picked === null}
          >
            OK
          </Button>
        </div>
      </Space>
    </Card>
  );
}
