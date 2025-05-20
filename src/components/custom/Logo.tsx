import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <div className="">
        <img className="w-full" src={logo} alt="Logo" />
      </div>
    </Link>
  );
};

export default Logo;
