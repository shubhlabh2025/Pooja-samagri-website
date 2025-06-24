// hooks/useGeolocation.ts
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  setLocation,
  setLocationError,
  setLocationLoading,
} from "../features/address/addressSlice";

export const useGeolocation = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch(setLocationError("Geolocation is not supported"));
      return;
    }

    dispatch(setLocationLoading(true));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        );
        dispatch(setLocationLoading(false));
      },
      (error) => {
        dispatch(setLocationError(error.message));
        dispatch(setLocationLoading(false));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // Cache for 5 minutes
      },
    );
  }, [dispatch]);
};
