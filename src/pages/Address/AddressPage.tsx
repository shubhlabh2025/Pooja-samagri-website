"https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=YOUR_LOCATION";

import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { env } from "@/env/env";
import DetailAddressComponent from "./DetailAddressComponent";
import type { CoordinateProps } from "@/interfaces/coordinateprops";
import { useGetCurrentAddressQuery } from "@/features/address/AddresssAPI";
import { Drawer } from "@/components/ui/drawer";
import AddressDetailBottomSheet from "@/components/bottomsheet/AddressDetailBottomSheet";
import type { CompleteAddressProps } from "@/interfaces/completeAddressProps";
type Poi = { key: string; location: google.maps.LatLngLiteral };

export interface AdressChangeProps {
  onChange: () => void;
}

interface AddressPageProps extends AdressChangeProps, CoordinateProps {}

const AddressPage = ({ onChange, lat, lng }: AddressPageProps) => {
  const navigate = useNavigate();

  const {
    data: addressData = {
      success: false,
      message: "",
      data: {
        success: false,
        address: "",
        components: [],
      },
    },
    isLoading: addressLoading,
    isError: addressError,
  } = useGetCurrentAddressQuery({ lat, lng });
  const [selectedAddress, setSelectedAddress] = useState("Mumbai");
  const [showDrawer, setShowDrawer] = useState(false);

  const handleAddressSave = (data: CompleteAddressProps) => {
    const { addressLine1, addressLine2, landmark, name, phone_number } = data;

    console.log(addressLine1 + addressLine2 + landmark + name + phone_number);
    setShowDrawer(false);
  };

  useEffect(() => {
    if (addressData?.data?.address && !addressLoading) {
      setSelectedAddress(addressData.data.address);
    }
  }, [addressData, addressLoading]);

  useEffect(() => {
    if (addressError) {
      setSelectedAddress("Hyderabad");
    }
  }, [addressError]);

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex h-16 w-full items-center border-b border-gray-200 px-4">
        <ChevronLeft
          className="mr-3 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>
      <APIProvider apiKey={env.MAPS_KEY}>
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{
            lat: lat || 31.61404351178462,
            lng: lng || 74.88916441294835,
          }}
          defaultZoom={17}
          mapId={"PoojaMap"}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <PoiMarkers
            pois={{
              key: "Your location",
              location: {
                lat: lat || 31.61404351178462,
                lng: lng || 74.88916441294835,
              },
            }}
          />
        </Map>
      </APIProvider>
      <DetailAddressComponent
        onAdressChange={onChange}
        address={selectedAddress || "Hyderabad"}
        onLocationConfirm={() => {
          setShowDrawer(true);
        }}
      />
      {showDrawer && (
        <Drawer open={showDrawer} onOpenChange={setShowDrawer}>
          <AddressDetailBottomSheet onSave={handleAddressSave} />
        </Drawer>
      )}
    </div>
  );
};

const PoiMarkers = (props: { pois: Poi }) => {
  return (
    <>
      <AdvancedMarker key={props.pois.key} position={props.pois.location}>
        <Pin background={"#f10b07"} glyphColor={"#000"} borderColor={"#000"} />
      </AdvancedMarker>
    </>
  );
};

export default AddressPage;
