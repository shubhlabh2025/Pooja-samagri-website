import { useNavigate } from "react-router";

const AddMoreItems = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow-cart-card mb-1 flex justify-center rounded-lg bg-white p-4">
      <p className="text-[13px] leading-[17px] font-semibold -tracking-[0.33px] text-[#02060cbf]">
        Missed Something?{" "}
        <span
          className="cursor-pointer text-[#ff5200]"
          onClick={() => {
            console.log("new item clicked");
            navigate("/", { replace: true });
          }}
        >
          Add more items
        </span>
      </p>
    </div>
  );
};

export default AddMoreItems;
