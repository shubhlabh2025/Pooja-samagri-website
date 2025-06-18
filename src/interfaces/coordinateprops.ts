export interface CoordinateProps {
  lat: number | null;
  lng: number | null;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
}
