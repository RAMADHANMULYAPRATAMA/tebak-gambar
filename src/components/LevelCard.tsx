import { useNavigate } from "react-router";

interface LevelCardProps {
  title: string;
  description: string;
  level: "mudah" | "sedang" | "sulit";
  icon: string;
  image: string;
  open?: boolean;
  locked?: boolean;
}

const LevelCard: React.FC<LevelCardProps> = ({
  title,
  description,
  level,
  image,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/level/" + level)}
      className={`relative rounded-xl shadow border-slate-800 bg-white cursor-pointer overflow-hidden `}
    >
      <div className="flex">
        <img src={image} alt="" className="w-1/3" />

        <div className="flex-1 p-4">
          <h3 className="text-lg font-bold dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500 ">{description}</p>

          <span className="text-xs mt-5 text-blue-500">5 gambar</span>
        </div>
      </div>
    </div>
  );
};

export default LevelCard;
