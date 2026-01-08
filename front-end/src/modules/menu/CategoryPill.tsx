
import type { Category } from "../../types";

interface CategoryPillProps {
  category: Category;
  isActive: boolean;
  onClick: (id: string) => void;
}

const CategoryPill = ({
  category,
  isActive,

  onClick,
}: CategoryPillProps) => {
  return (
    <button
      onClick={() => onClick(category.id)}
      className={`flex items-center justify-center md:gap-2 px-4 md:px-5  py-1 md:py-2.5 rounded-full ${
        isActive ? "bg-orange-500 text-white" : "bg-white text-gray-600"
      }`}
    >
      <span>{category.emoji}</span>
      <span>{category.name}</span>
    </button>
  );
};

export default CategoryPill;
