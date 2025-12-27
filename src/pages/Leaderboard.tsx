import { Link, useParams } from "react-router";
import { useLeaderboard } from "../hooks/useLeaderboard";

export type Leaderboard = {
  id: string;
  name: string;
  time: string;
  level: string;
};

const Leaderboard = () => {
  const { level } = useParams();
  const name = localStorage.getItem("name");

  const leaderboard = useLeaderboard(level ?? "");

  const rank = leaderboard.data
    .filter((v) => v.level == level)
    .sort((a, b) => Number(a.time) - Number(b.time));

  return (
    <div className="min-h-screen flex justify-between pb-6 flex-col">
      <main className="relative flex w-full flex-col justify-between overflow-x-hidden mx-auto max-w-md">
        {/* Top App Bar */}
        <div className="flex items-center py-4 pb-6 justify-between ">
          <Link
            to={"/level"}
            className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h2 className="text-lg font-bold leading-tight flex-1 text-center pr-10 tracking-tight">
            Waktu Tercepat
          </h2>
        </div>

        {/* Podium Section */}
        <div className="relative flex flex-col items-center justify-center pt-8 pb-6 px-4">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="flex items-end justify-center w-full gap-4 z-10">
            {/* Rank 2 */}
            {rank.length > 1 && (
              <div className="flex flex-col items-center gap-2 mb-4 cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-slate-300 dark:border-slate-500 p-1 bg-background-light dark:bg-card-dark shadow-lg">
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: "url('/person.png')",
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md border border-background-dark">
                    #2
                  </div>
                </div>
                <div className="text-center mt-1">
                  <p className="font-bold text-sm truncate">{rank[1].name}</p>
                  <p className="text-primary font-bold text-base">
                    {rank[1].time}s
                  </p>
                </div>
              </div>
            )}

            {/* Rank 1 */}
            {rank.length > 0 && (
              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="relative">
                  <span className="material-symbols-outlined absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 text-3xl animate-bounce">
                    crown
                  </span>
                  <div className="w-28 h-28 rounded-full border-4 border-yellow-400 p-1 bg-background-light dark:bg-card-dark shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: "url('/person.png')",
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-sm font-bold px-3 py-0.5 rounded-full shadow-md border-2 border-background-dark">
                    #1
                  </div>
                </div>
                <div className="text-center mt-2">
                  <p className="font-bold text-lg truncate">{rank[0].name}</p>
                  <p className="text-yellow-400 font-extrabold text-xl">
                    {rank[0].time}s
                  </p>
                </div>
              </div>
            )}

            {/* Rank 3 */}
            {rank.length > 2 && (
              <div className="flex flex-col items-center gap-2 mb-4 cursor-pointer">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-orange-700/60 p-1 bg-background-light dark:bg-card-dark shadow-lg">
                    <div
                      className="w-full h-full rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: "url('/person.png')",
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-700 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md border border-background-dark">
                    #3
                  </div>
                </div>
                <div className="text-center mt-1">
                  <p className="font-bold text-sm truncate">{rank[2].name}</p>
                  <p className="text-primary font-bold text-base">
                    {rank[2].time}s
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* List Peringkat */}
        {rank.length >= 4 && (
          <>
            {/* Section Header */}
            <h3 className="mb-2 text-slate-900 dark:text-white text-base font-bold leading-tight px-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">
                leaderboard
              </span>
              Peringkat Lainnya
            </h3>

            <div className="flex flex-col gap-1 px-4 mb-4">
              {/* User card */}
              {rank.map(
                (v, i) =>
                  i > 2 &&
                  i <= 10 && (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-white/75 px-4 py-3 rounded-xl shadow"
                    >
                      <div className="text-slate-500 font-bold text-lg w-6 text-center">
                        {i + 1}
                      </div>

                      <div className="flex items-center gap-3 flex-1 overflow-hidden">
                        <div
                          className="h-12 w-12 rounded-full bg-cover bg-center border border-slate-500"
                          style={{
                            backgroundImage: "url('/person.png')",
                          }}
                        />
                        <div className="min-w-0">
                          <p
                            className={`font-medium truncate ${v.name == name ? "text-blue-500" : ""}`}
                          >
                            {v.name}
                          </p>
                        </div>
                      </div>

                      <p className="font-bold">{v.time}s</p>
                    </div>
                  )
              )}
            </div>
          </>
        )}
      </main>
      <div className="px-4">
        <Link
          to={"/"}
          className="flex items-center justify-center w-full h-12 rounded-full bg-slate-800 text-white font-medium text-base active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined mr-2 text-[20px]">
            home
          </span>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
};

export default Leaderboard;
