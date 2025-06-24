import { env } from "@/env/env";

export const MapComponent = ({
  location = "Kot Karnail Singh Park, Kot karnail singh, Ram Singh Colony, Kotatma Ram, Amritsar, Amritsar Cantt., Punjab, India",
}) => {
  // Get API key from environment variable
  const apiKey = env.MAPS_KEY;

  // Don't render if no API key is available
  if (!apiKey) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-200">
        <p className="text-gray-600">Map API key not configured</p>
      </div>
    );
  }

  // Encode the location for URL safety

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&center=`;

  return (
    <div className="h-full w-full">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-md"
        title={`Map showing ${location}`}
      />
    </div>
  );
};
