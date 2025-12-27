import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import ResultPage from "./Result";
import { submitScore } from "../hooks/useSubmitScore";

type Puzzle = {
  id: number;
  image: string;
  suggested: string;
  answer: string;
};

type CategoryPerformance = {
  name: string;
  percentage: number;
};

interface Result {
  totalQuestions: number;
  correct: number;
  time: number;
  starCount?: number;
  categoryPerformance?: CategoryPerformance[];
}

const Puzzle = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { level } = useParams();

  const [timer, setTimer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [tries, setTries] = useState(0);
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"salah" | "dikit-lagi" | "benar" | null>(
    null
  );

  const [result, setResult] = useState<Result>({
    totalQuestions: 0,
    correct: 0,
    time: 0,
    starCount: 5,
  });

  useEffect(() => {
    fetch("/puzzle.json")
      .then((res) => res.json())
      .then((res) => setPuzzles(res[level ?? 0]));
  }, [level]);

  useEffect(() => {
    if (status) return;
    const tick = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(tick);
  }, [status]);

  const resetStatusWithDelay = () => setTimeout(() => setStatus(null), 1500);

  const validateAnswer = () => {
    const correctAnswer = puzzles[progress].answer.toLowerCase();
    const userAnswer = answer.toLowerCase();

    if (userAnswer === correctAnswer) return "benar";

    const isClose = correctAnswer.split(" ").includes(userAnswer);
    if (isClose) return "dikit-lagi";

    return "salah";
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const mm = mins.toString().padStart(2, "0");
    const ss = secs.toString().padStart(2, "0");

    return `${mm}:${ss}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTries((t) => t + 1);

    const validation = validateAnswer();
    setStatus(validation);
    resetStatusWithDelay();

    const isLast = progress + 1 === puzzles.length;
    const currentPuzzle = puzzles[progress];

    if (validation === "benar") {
      if (isLast) {
        const name = localStorage.getItem("name");
        if (name && level) submitScore(name, level, timer);
      }

      setResult({
        totalQuestions: puzzles.length,
        correct: puzzles.length,
        starCount: 5,
        time: timer,
        categoryPerformance: [
          {
            name: currentPuzzle.answer,
            percentage: tries,
          },
        ],
      });

      setTries(0);
      setProgress((p) => p + 1);
    }

    inputRef.current?.focus();
    setAnswer("");
  };

  const replayGame = () => {
    setProgress(0);
    setTimer(0);
    setTries(0);
    setStatus(null);
    setAnswer("");
  };

  if (progress === puzzles.length) {
    return (
      <ResultPage
        {...result}
        onReplay={replayGame}
        onHome={() => navigate("/")}
      />
    );
  }

  const puzzle = puzzles[progress];

  return (
    <div className="relative flex min-h-dvh max-w-md mx-auto flex-col overflow-hidden shadow-2xl">
      {/* HEADER */}
      <header className="sticky dark:text-white top-0 z-10 flex items-center justify-between p-4">
        <Link
          to={".."}
          className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-surface-dark transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>

        {/* <div className="flex flex-col items-center "> */}
        <h2 className="text-lg font-bold">Level {level}</h2>

        {/* </div> */}

        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined">timer</span>
          <span>{formatTime(timer)}</span>

          <button
            onClick={() => setAnswer(puzzle?.suggested.toUpperCase() ?? "")}
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-surface-dark text-primary transition-colors"
          >
            <span className="material-symbols-outlined">lightbulb</span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      {puzzle && (
        <div className="flex-1 flex flex-col px-4 pb-4">
          {/* STATUS FEEDBACK */}
          {status && (
            <motion.div
              animate={{ y: 150, opacity: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="absolute inset-x-0 flex justify-center z-10"
            >
              <img src={`/icon/${status}.png`} alt="" width={200} />
            </motion.div>
          )}

          {/* IMAGE */}
          <section className="relative">
            <span className="text-xs font-bold text-slate-800 absolute top-8 left-4 z-10">
              {progress + 1}/{puzzles.length}
            </span>
            <div
              className="aspect-square w-full rounded-xl bg-cover bg-center shadow-lg border-slate-400 relative overflow-hidden"
              style={{ backgroundImage: `url(${puzzle.image})` }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/20" />
            </div>
          </section>

          {/* INPUT */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-3">
            <p className="text-center text-sm text-slate-700">
              Apa jawaban dari gambar di atas?
            </p>

            <input
              value={answer}
              ref={inputRef}
              onFocus={() => {
                setTimeout(() => {
                  inputRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }, 300);
              }}
              onChange={(e) => setAnswer(e.target.value.toUpperCase())}
              placeholder="KETIK JAWABAN..."
              className="outline-none h-14 w-full rounded-xl bg-white shadow-xl text-lg font-bold tracking-widest text-center px-4"
            />

            <button
              type="submit"
              disabled={!!status}
              className="h-14 w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-bold shadow-lg hover:bg-primary-dark transition-all"
            >
              Kirim Jawaban
              <span className="material-symbols-outlined text-[20px]">
                send
              </span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Puzzle;
