export interface BookingT {
  booking_id: number
  customer_id: string
  payment_id: string
  property_id: string
  room_id: string
  payment_status: string
  transactional_id: string
  payment_mode: string
  created_at: string
  no_of_adults: number
  no_of_childrens: number
  original_price: number
  offer_price: number
  total_amount: number
  convenience_charge: number
  review_id: string
  booking_date: string
  check_in: string
  check_out: string
  refund_status:string
  booking_status: string
  check_in_status: string
  is_deleted: number
  roomDetails: RoomDetail[]
  customerDetails: CustomerDetails
  propertyDetails: PropertyDetails
}

export interface RoomDetail {
  room_id: number
  property_id: string
  room_type: string
  room_image_urls: string
  smoking_preference: string
  max_adult: number
  max_child: number
  breakfast_included: number
  room_admin_id: string
  available: number
  current_booking_id: string
  room_amenities: string
  room_Name: string
  no_Of_Rooms: number
  price_Per_Night: number
  bed_Type: string
  room_Size: number
  no_Of_Adults: number
  no_of_Children: number
  extra_Bed_Allowed: number
  no_Of_ExtraBeds: number
  price_Per_ExtraBed: number
  smoke_Free_Room: number
  meal_Option: string
  is_deleted: number
  createdAt: string
}

export interface CustomerDetails {
  customer_id: number
  user_id: number
  first_name: string
  last_name: string
  gender: string
  email_id: string
  phone_number: string
  date_of_birth: string
  address: string
  language_settings: string
  pincode: string
  city: string
  country: string
  currency: string
  image_url: string
  booking_count: number
  available: string
  created_at: string
  is_deleted: number
  deleted_at: string
}

export interface PropertyDetails {
  property_id: number
  property_name: string
  property_city: string
  property_addressLine1: string
  property_addressLine2: string
  property_state: any
  property_primaryphone_number: string
  property_secondaryphone_number: string
  property_roomid: any
  property_cancellation_policy: string
  property_payment_policy: string
  property_country: string
  property_pincode: any
  property_offer_percentage: any
  property_latitude: number
  property_longitude: number
  available: number
  property_totalNoOfRooms: number
  property_policy: string
  ratings_number: number
  price_per_night: number
  special_offer_id: string
  admin_id: string
  amenity: string
  property_images: string
  is_deleted: number
  created_at: string
  propertyuser_userid: string
  propertyuser_username: any
  propertyuser_password: any
  propertyuser_accountHolderName: any
  propertyuser_accountNo: any
  propertyuser_ifscCode: any
  propertyuser_bankName: any
  propertyuser_panDetail: any
  propertyuser_gstNumber: any
}
