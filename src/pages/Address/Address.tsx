import { useState } from "react";
import AddressPage from "./AddressPage";
import SearchAddressPage from "./SearchAddressPage";
import { useAppSelector } from "@/app/hooks";

const Address = () => {
  const [searchPage, setSearchPage] = useState(false);

  const location = useAppSelector((state) => state.location);

  console.log(location);

  const [lat, setLat] = useState(location.lat);
  const [lng, setLng] = useState(location.lng);

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {searchPage ? (
        <SearchAddressPage
          onChange={() => setSearchPage(false)}
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
        />
      ) : (
        <AddressPage
          onChange={() => setSearchPage(true)}
          lat={lat}
          lng={lng}
          setLat={setLat}
          setLng={setLng}
        />
      )}
    </div>
  );
};

export default Address;
