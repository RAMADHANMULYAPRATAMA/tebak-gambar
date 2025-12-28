import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Home: React.FC = () => {
  const [name, setName] = useState<string | null>(localStorage.getItem("name"));
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // console.log(document.querySelector('#music') as HTMLAudioElement);

  const saveName = (value: string) => {
    setName(value);
    localStorage.setItem("name", value);
    setIsEditing(false);
  };

  return (
    <div className="min-h-svh py-10 px-6">
      <img src="/icon/icon.png" alt="icon" width={200} className="mx-auto" />
      <div className="space-y-2 my-5">
        {!name || isEditing ? (
          /* INPUT MODE */
          <div className="w-full flex gap-3">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 text-xl">
                  person
                </span>
              </div>
              <input
                defaultValue={name ?? ""}
                className="block w-full h-14 pl-11 pr-4 rounded-xl bg-surface-light ring-1 ring-white/5  text-slate-800 text-sm font-medium outline-none shadow-xl"
                placeholder="Masukkan nama kamu"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveName(e.currentTarget.value);
                  }
                }}
              />
            </div>

            {/* Save Button */}
            <button
              onClick={() => {
                const input = document.querySelector<HTMLInputElement>(
                  'input[placeholder="Masukkan nama kamu"]'
                );
                if (input?.value) saveName(input.value);
              }}
              className="px-4 rounded-xl bg-surface-light text-slate-800 font-semibold shadow-md hover:bg-surface-light/50 transition"
            >
              <span className="material-symbols-outlined">save</span>
            </button>
          </div>
        ) : (
          /* USER CARD */
          <div className="w-full h-16 rounded-2xl bg-surface-light border border-white/5 shadow-md flex items-center justify-between px-5">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  person
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-400">Nama Pemain</p>
                <p className="font-bold text-slate-800">{name}</p>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="text-slate-400 hover:text-primary transition"
            >
              <span className="material-symbols-outlined">edit</span>
            </button>
          </div>
        )}
        <button
          onClick={() => {
            const music = document.querySelector('#music') as HTMLAudioElement
            music.play();
            if (!name)  alert('Harap isi nama');
            else navigate("/level")
          }}
          className="group relative w-full h-16 bg-primary hover:bg-sky-500 active:scale-[0.98] transition-all duration-200 rounded-2xl flex items-center justify-between px-6 shadow-lg shadow-primary/25 overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[24px]">
                play_arrow
              </span>
            </div>
            <span className="text-white text-lg font-bold leading-none">
              Mulai Permainan
            </span>
          </div>

          <span className="material-symbols-outlined text-white/70 group-hover:translate-x-1 transition-transform text-[20px]">
            arrow_forward_ios
          </span>
        </button>
        <Link
          to={"/leaderboard"}
          className="group relative w-full h-16 bg-cyan-400 hover:bg-cyan-500 active:scale-[0.98] transition-all duration-200 rounded-2xl flex items-center justify-between px-6 shadow-lg shadow-primary/25 overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

          <div className="flex items-center gap-4">
            <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[24px]">
                leaderboard
              </span>
            </div>
            <span className="text-white text-lg font-bold leading-none">
              Peringkat Pemain
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
