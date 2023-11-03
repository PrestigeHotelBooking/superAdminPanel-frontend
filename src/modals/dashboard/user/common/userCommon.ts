export type userModalInputT={
    searchText:string;
    pageRows:number;
    calendarStartDate: Date | null; 
    calendarEndDate: Date | null;
    dateFilterColumn:string;
    userData:CustomerDataT[];
}



  

export const initialuserModalInput:userModalInputT={
    searchText:'',
    pageRows:0,
    calendarStartDate: null,
    calendarEndDate: null,
    dateFilterColumn:'',
    userData:[]

}


export interface CustomerDataT {
    customer_id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    gender: string;
    email_id: string;
    phone_number: string;
    date_of_birth: string;
    address: string;
    language_settings: string;
    pincode: string;
    city: string;
    country: string;
    currency: string;
    image_url: string;
    booking_count: number;
    available: string;
    created_at: string;
    is_deleted: number;
    deleted_at: string | null;
  }
  

  
 export  interface SingleCustomerBooking {
  
        current_booking_id: number;
        booking_id: number;
        room_id: string;
        customer_id: string;
        booking_date: string;
        check_in_date: string;
        check_out_date: string;
        total_price: number;
        payment_status: string;
        payment_id: string;
        property_id: number;
        transactional_id: string;
        payment_mode: string;
        created_at: string;
        no_of_adults: number;
        no_of_childrens: number;
        original_price: number;
        offer_price: number;
        convenience_charge: number;
        review_id: string;
        property_name: string;
        property_city: string;
        property_addressLine1: string;
        property_addressLine2: string;
        property_country: string;
        property_pincode: string | null;
        property_offer_percentage: number;
        property_latitude: number;
        property_longitude: number;
        available: number;
        property_policy: string | null;
        ratings_number: number;
        price_per_night: number;
        special_offer_id: string;
        admin_id: string;
        amenity: string[];
        property_images: string[];
      }
      
export const dateFilterUserOption=[
    {
        label: 'Joined Date',
        value: 'created_at',
    }]