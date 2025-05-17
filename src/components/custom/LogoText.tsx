import logo from "../../assets/logo.png"
const Logo: React.FC = () => {
  return (
    <div className="h-[50px] w-[120px] overflow-hidden">
      <img
        className="h-full w-full object-contain"
        src={logo}
        alt="Logo"
      />
    </div>
  );
};

export default Logo;

