export type PropertyDataT = {
  property_id: string;
  property_name: string;
  property_city: string;
  property_addressLine1: string;
  property_addressLine2: string;
  property_country: string;
  property_pincode: number;
  property_offer_percentage: number;
  property_latitude: number;
  property_longitude: number;
  property_totalNoOfRooms:number;
  available: number;
  property_policy: string;
  ratings_number: number;
  price_per_night: number;
  special_offer_id: string;
  admin_id: string;
  amenity: string[]; // Assuming this should be an array of strings
  property_images: string[]; // Assuming this should be an array of image URLs
  address: {
    addressLine1: string;
    addressLine2: string;
  };
  };
  

  // Define types and interfaces
export interface OptionT {
  label: string;
  value: string;
}

export const yesOrNoOption: OptionT[] = [
  { label: 'Yes', value: 'YES' },
  { label: 'No', value: 'NO' }
];

export const roomTypes: OptionT[] = [
  { label: "Single Room", value: "single" },
  { label: "Double Room", value: "double" },
  { label: "Suite", value: "suite" },
  { label: "Twin Room", value: "twin" },
  { label: "Deluxe Room", value: "deluxe" },
  { label: "Executive Suite", value: "executive_suite" },
  { label: "Family Room", value: "family" },
  { label: "Connecting Room", value: "connecting" },
  { label: "Presidential Suite", value: "presidential_suite" },
  { label: "Accessible Room", value: "accessible" },
  // Add more room types as needed
];

export const bedTypes: OptionT[] = [
  { label: "Single Bed", value: "single" },
  { label: "Double Bed", value: "double" },
  { label: "Queen Bed", value: "queen" },
  { label: "King Bed", value: "king" },
  { label: "Twin Beds", value: "twin" },
  { label: "California King Bed", value: "cal_king" },
  { label: "Sofa Bed", value: "sofa" },
  { label: "Bunk Bed", value: "bunk" },
  { label: "Trundle Bed", value: "trundle" },
  { label: "Murphy Bed", value: "murphy" },
  // Add more bed types as needed
];

export const mealTypes: OptionT[] = [
  { label: "Breakfast Included", value: "breakfast" },
  { label: "Half Board", value: "half_board" },
  { label: "Full Board", value: "full_board" },
  { label: "All-Inclusive", value: "all_inclusive" },
  { label: "Room Only", value: "room_only" },
  { label: "Continental Breakfast", value: "continental_breakfast" },
  { label: "Buffet", value: "buffet" },
  { label: "À la carte", value: "a_la_carte" },
  { label: "No Meals", value: "no_meals" },
  { label: "Special Diet Options", value: "special_diet" },
  // Add more meal options as needed
];


