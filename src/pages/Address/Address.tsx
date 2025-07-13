import { useEffect, useState } from "react";
import AddressPage from "./AddressPage";
import SearchAddressPage from "./SearchAddressPage";
import { useAppSelector } from "@/app/hooks";

const Address = () => {
  const [searchPage, setSearchPage] = useState(false);

  const location = useAppSelector((state) => state.location);

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  useEffect(() => {
    if (location.lat !== null && location.lng !== null) {
      setLat(location.lat);
      setLng(location.lng);
    }
  }, [location.lat, location.lng]);

  if (location.loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Loading location...</p>
      </div>
    );
  }

  if (location.error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p className="text-sm text-red-500">
          Failed to load location: {location.error}
        </p>
      </div>
    );
  }

  // If lat/lng is still null after loading
  if (lat === null || lng === null) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Location not available</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {searchPage ? (
        <SearchAddressPage
          onChange={(lat, lng) => {
            setSearchPage(false);
            setLat(lat);
            setLng(lng);
          }}
          lat={lat}
          lng={lng}
        />
      ) : (
        <AddressPage onChange={() => setSearchPage(true)} lat={lat} lng={lng} />
      )}
    </div>
  );
};

export default Address;
