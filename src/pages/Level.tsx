import { Link } from "react-router";
import LevelCard from "../components/LevelCard";

const Level: React.FC = () => {
  return (
    <div className="bg-[url('background.png')] bg-center bg-cover bg-fixed min-h-svh pb-4 font-display antialiased">
      <div className="relative flex max-w-md mx-auto flex-col shadow-2xl">
        {/* Header */}
        <header className="flex items-center justify-between p-4">
          <Link
            to={".."}
            className="flex p-3 bg-blue-500 text-white size-10 items-center justify-center rounded-full hover:bg-surface-dark transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>

          <h2 className="flex-1 text-center pr-10 text-lg font-bold">
            Pilih Level
          </h2>
        </header>

        {/* Main */}
        <main className="flex-1 space-y-6 px-4 overflow-y-auto">
          <p className="text-center text-sm text-slate-800 font-bold">
            Tantang diri Anda dengan berbagai tingkat kesulitan.
          </p>

          <LevelCard
            level="mudah"
            title="Mudah"
            description="Pemanasan otak dengan tebakan sederhana."
            icon="eco"
            image="/easy.jpg"
            open
          />

          <LevelCard
            level="sedang"
            title="Sedang"
            description="Tantangan seru yang butuh ketelitian."
            icon="bolt"
            image="/medium.jpg"
            locked
          />

          <LevelCard
            level="sulit"
            title="Sulit"
            description="Khusus ahli, siapkan mentalmu!"
            icon="local_fire_department"
            image="/hard.jpg"
            locked
          />
        </main>
      </div>
    </div>
  );
};

export default Level;
