import logo from "../../assets/logo.webp"

const Footer = () => {
  return (
    <footer className="bg-[#1d1d1d] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Copy */}
        <div className="text-center md:text-left space-y-4">
          <img src={logo} alt="Pilgrimaide Logo" className="mx-auto md:mx-0 w-36" />
          <p>ShubhLabh @ 2025, All Rights Reserved</p>
        </div>

        {/* Address */}
        <div className="text-center md:text-left space-y-2 text-sm leading-relaxed">
          <p className="font-medium">Gmoyd Online Services Private Ltd.</p>
          <p>
            Shreeji vraj bhoomi complex, Phase 7,<br />
            Brahmand, Thane, 400607
          </p>
          <p>(+91) 9619 899 406</p>
          <p>orders@shubhLabh.com</p>
        </div>

        {/* Navigation Links */}
        <div className="text-center md:text-left space-y-2 text-sm">
          <p>About</p>
          <p>Blog</p>
          <p>Temples</p>
          <p>Pilgrimages</p>
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
          <p>Contact</p>
        </div>

        {/* Social Links */}
        <div className="text-center md:text-left space-y-2 text-sm">
          <p>Facebook</p>
          <p>Linkedin</p>
          <p>Instagram</p>
          <p>YouTube</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
