export interface AddressPredictionResponse {
  success: boolean;
  message: string;
  data: {
    success: boolean;
    predictions: Prediction[];
  };
}

export interface Prediction {
  description: string;
  matched_substrings: MatchedSubstring[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  terms: Term[];
  types: string[];
  lat: number;
  lng: number;
}

export interface MatchedSubstring {
  length: number;
  offset: number;
}

export interface StructuredFormatting {
  main_text: string;
  main_text_matched_substrings: MatchedSubstring[];
  secondary_text: string;
}

export interface Term {
  offset: number;
  value: string;
}

export interface GetAddressParams {
  lat?: number | null;
  lng?: number | null;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface AddressData {
  success: boolean;
  address: string;
  components: AddressComponent[];
}

export interface CurrentAddressResponse {
  success: boolean;
  message: string;
  data: AddressData;
}

export interface UserAddressPayload {
  id: string;
  user_id: string;
  phone_number: string;
  name: string;
  addressLine1?: string;
  addressLine2?: string;
  landmark?: string;
  city?: string;
  state?: string;
  pincode?: string;
}