import { Link } from "react-router";

const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500'];

export default function OverallLeaderboard() {
  return <div className="relative flex min-h-dvh max-w-md mx-auto flex-col overflow-hidden shadow-2xl">
      {/* HEADER */}
      <header className="sticky relative items-center top-0 z-10 flex  p-4 mb-6">
        <Link
            to={".."}
            className="absolute flex p-3 bg-blue-500 text-white size-10 items-center justify-center rounded-full hover:bg-surface-dark transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>

        <h2 className="text-lg font-bold text-center mx-auto">Pilih Level Leaderboard</h2>

      </header>

      <div className="space-y-2 px-5">
        {['mudah', 'sedang', 'sulit'].map((level, i) =>  
        <Link
          to={`/level/${level}/leaderboard`}
          className={`${colors[i]} flex items-center justify-center w-full h-12 rounded-full  text-white font-medium text-base active:scale-[0.98] transition-all`}
        >
          <span className="material-symbols-outlined mr-2 text-[20px]">
            trophy
          </span>
          Peringkat {level}
        </Link>)}
        </div>
    </div> 
}