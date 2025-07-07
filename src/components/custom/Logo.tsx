import { Link } from "react-router";
import logo from "@/assets/LOGO1.png";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <div className="">
        <img className="w-45" src={logo} alt="Logo" />
      </div>
    </Link>
  );
};

export default Logo;
