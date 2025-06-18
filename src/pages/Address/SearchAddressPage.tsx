import { useAppSelector } from "@/app/hooks";
import type { Prediction } from "@/features/address/addressAPI.type";
import { useGetAddressSuggestionsQuery } from "@/features/address/AddresssAPI";
import type { CoordinateProps } from "@/interfaces/coordinateprops";
import { ChevronLeft, MapPin, Navigation } from "lucide-react";
import { useEffect, useState } from "react";

export interface AddressChangeProps {
  onChange: () => void;
}
interface SearchAddressPageProps extends AddressChangeProps, CoordinateProps {}

const SearchAddressPage = ({
  onChange,
  setLat,
  setLng,
}: SearchAddressPageProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const location = useAppSelector((state) => state.location);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError } = useGetAddressSuggestionsQuery(
    debouncedSearch,
    {
      skip: debouncedSearch.length < 3,
    },
  );

  const handlePredictionClick = (prediction: Prediction) => {
    const placeLat = prediction.lat;
    const placeLng = prediction.lng;

    setLat(placeLat);
    setLng(placeLng);
    onChange(); // Switch back to map view
  };

  const handleCurrentLocationClick = () => {
    const placeLat = location.lat;
    const placeLng = location.lng;

    setLat(placeLat || 24.54354);
    setLng(placeLng || 22.44543);
    onChange(); // Switch back to map view
  };

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <div className="flex h-16 w-full items-center border-b border-gray-200 px-4">
        <ChevronLeft className="mr-3 cursor-pointer" onClick={onChange} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for area, street name…"
          className="flex-1 border-none text-base font-normal text-gray-700 placeholder-gray-400 outline-none focus:ring-0"
        />
      </div>

      <div className="flex flex-col px-4 pt-4">
        {/* If search is empty, show 'Use My Current Location' */}
        {search.trim() === "" ? (
          <div
            className="flex cursor-pointer items-center border-b border-gray-100 py-4"
            onClick={() => onChange}
          >
            <Navigation className="mr-3 h-5 w-5 text-orange-500" />
            <p
              className="font-semibold text-orange-600"
              onClick={() => {
                handleCurrentLocationClick();
              }}
            >
              Use My Current Location
            </p>
          </div>
        ) : (
          <>
            {debouncedSearch.length >= 3 && (
              <h2 className="mb-4 text-sm font-semibold text-gray-800">
                Search Results
              </h2>
            )}
            {isLoading && <p className="text-gray-500">Loading...</p>}
            {isError && <p className="text-red-500">Something went wrong</p>}
            {!isLoading &&
              data?.data?.predictions?.map((prediction, index) => (
                <div
                  key={index}
                  className="flex items-start border-b border-gray-100 py-4"
                  onClick={() => handlePredictionClick(prediction)}
                >
                  <MapPin className="mt-1 mr-3 h-5 w-5 flex-shrink-0 text-gray-700" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {prediction.structured_formatting.main_text}
                    </p>
                    <p className="text-sm text-gray-500">
                      {prediction.structured_formatting.secondary_text}
                    </p>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchAddressPage;
