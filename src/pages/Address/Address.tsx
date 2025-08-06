import { useEffect, useState } from "react";
import AddressPage from "./AddressPage";
import SearchAddressPage from "./SearchAddressPage";
import { useAppSelector } from "@/app/hooks";

const Address = () => {
  const [searchPage, setSearchPage] = useState(false);
  const location = useAppSelector((state) => state.location);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<
    "granted" | "prompt" | "denied" | null
  >(null);

  useEffect(() => {
    // Check if the geolocation API is supported
    if ("geolocation" in navigator) {
      // Check for permission status first
      if ("permissions" in navigator) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((result) => {
            setPermissionStatus(result.state);
            if (result.state === "granted") {
              // Now we can safely call getCurrentPosition
              (navigator as Navigator).geolocation.getCurrentPosition(
                (position) => {
                  setLat(position.coords.latitude);
                  setLng(position.coords.longitude);
                },
                (error) => {
                  console.error("Error getting location:", error);
                },
              );
            }
          })
          .catch((error) => {
            console.error("Error querying permissions:", error);
            setPermissionStatus("denied");
          });
      } else {
        // Fallback for browsers that don't support the Permissions API.
        // The call to getCurrentPosition will prompt the user.
        setPermissionStatus("prompt");
        (navigator as Navigator).geolocation.getCurrentPosition(
          (position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            setPermissionStatus("granted");
          },
          (error) => {
            console.error("Error getting location:", error);
            setPermissionStatus("denied");
          },
        );
      }
    } else {
      // Geolocation is not supported by the browser
      setPermissionStatus("denied");
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // Sync with Redux state if it becomes available
  useEffect(() => {
    if (location.lat !== null && location.lng !== null) {
      setLat(location.lat);
      setLng(location.lng);
    }
  }, [location.lat, location.lng]);

  // Handle loading and error states for initial permission check
  if (permissionStatus === null) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Checking location permission...</p>
      </div>
    );
  }

  if (permissionStatus === "denied") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-white p-4 text-center">
        <h2 className="mb-2 text-lg font-semibold text-red-500">
          Location Permission Denied
        </h2>
        <p className="mb-4 text-sm text-gray-700">
          We need your location to show nearby addresses. Please enable location
          services for this site in your browser settings.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Reload to Try Again
        </button>
      </div>
    );
  }

  if (location.loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Loading location...</p>
      </div>
    );
  }

  if (lat === null || lng === null) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p className="text-sm text-gray-500">
          Waiting for location coordinates...
        </p>
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
