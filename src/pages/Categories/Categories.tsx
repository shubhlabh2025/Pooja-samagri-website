import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

const categories = [
  {
    title: "TEMPLE COLLECTION",
    image:
      "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
  {
    title: "MOSQUITO REPELLENTS",
    image:
      "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
  {
    title: "BAMBOOLESS INCENSE STICKS",
    image:
      "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
  {
    title: "GIFT BOXES",
    image:
      "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
  {
    title: "PREMIUM INCENSE",
    image:
      "https://assets.customerglu.com/35deace8-c04f-43c3-a00b-9c06eaae7acb/WhatsApp Image 2025-05-12 at 01.36.19.jpeg",
  },
];

const CategoriesScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col space-y-4 p-2">
      {/* Header with icon and title */}

      {/* Back button on the left */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-10 mr-2 flex items-center gap-1 rounded-full bg-gray-200 p-1 hover:bg-gray-300"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 mt-12 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-lg shadow-sm"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="h-40 w-full object-cover md:h-60"
            />

            <div className="absolute bottom-0 w-full bg-black/70 py-2 text-center text-sm font-semibold text-white">
              {cat.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesScreen;
