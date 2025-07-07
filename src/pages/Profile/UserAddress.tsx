import { useGetUserAddressListQuery } from "@/features/address/AddresssAPI";
import AddressCard from "./AddressCard";

const UserAddress = () => {
  const { data: addressData = { data: [] } } = useGetUserAddressListQuery(); // List Data First time

  return (
    <div className="space-y-4">
      {addressData.data.map((addr) => (
        <>
        <AddressCard data={addr}/>
        
        </>
      ))}
    </div>
  );
};

export default UserAddress;
