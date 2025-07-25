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
import { useAddUserAddressMutation } from "@/features/address/AddresssAPI";
import { Drawer } from "@/components/ui/drawer";
import AddressDetailBottomSheet from "@/components/bottomsheet/AddressDetailBottomSheet";
import type { CompleteAddressProps } from "@/interfaces/complete-address-props";
import type { CreateUserAddressPayload } from "@/features/address/addressAPI.type";
import { useGetAddressFromLatLngQuery } from "@/features/maps/MapsApi";
import type { AddressComponent } from "@/features/maps/MapAPi.type";
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
        formatted_address: "",
        address_components: [],
        geometry: {
          location: {
            lat: 31.61404351178462,
            lng: 74.88916441294835,
          },
        },
      },
    },
    isLoading: addressLoading,
    isError: addressError,
  } = useGetAddressFromLatLngQuery({ lat, lng });

  const [addUserAddress] = useAddUserAddressMutation();

  const [selectedAddress, setSelectedAddress] = useState("Mumbai");
  const [showDrawer, setShowDrawer] = useState(false);

  const extractAddressFields = (components: AddressComponent[]) => {
    const getComponent = (type: string) =>
      components.find((c) => c.types.includes(type))?.long_name || "";

    return {
      city: getComponent("locality"),
      state: getComponent("administrative_area_level_1"),
      pincode: getComponent("postal_code"),
    };
  };

  const handleAddressSave = async (data: CompleteAddressProps) => {
    const { address_line1, address_line2, landmark, name, phone_number } = data;

    const { city, state, pincode } = extractAddressFields(
      addressData.data.address_components,
    );
    const fullPayload: CreateUserAddressPayload = {
      phone_number,
      name,
      address_line1,
      address_line2,
      landmark,
      city,
      state,
      pincode,
      lat,
      lng,
      is_default: true,
    };

    // Strip out id and user_id before sending to backend

    await addUserAddress(fullPayload);
    // navigate("/");
    // post to backend
    setShowDrawer(false);
    navigate(-1);
  };

  useEffect(() => {
    if (addressData?.data?.formatted_address && !addressLoading) {
      setSelectedAddress(addressData.data.formatted_address);
    }
  }, [addressData, addressLoading]);

  useEffect(() => {
    if (addressError) {
      setSelectedAddress("Hyderabad");
    }
  }, [addressError]);

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex w-full items-center border-b border-gray-200 px-4 py-3">
        <ChevronLeft
          className="mr-3 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>
      <APIProvider apiKey={env.MAPS_KEY}>
        <Map
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
