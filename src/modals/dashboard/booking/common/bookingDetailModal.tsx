import PrModal from "@/components/common/PrModalBox/PrModalBox";
import { useMemo, useState } from "react";
import products from '../../../common/booking_data.json';
import _ from "lodash";
import PrLabel from "@/components/common/PrLabel/PrLabel";
import DateFormat from "@/components/common/DateFormat/dateFormat";
import { BookingComponentStatusColor, CheckInStatusComponentColor, bookingStatusT, checkInStatusT } from "./bookingComponent";
import { ComissionCellComponentColor, PaymentStatusCellComponentColor } from "../../payment/paymentModal";
import { PaymentStatusT } from "../../payment/common/paymentCommon";
import PrButtonV2 from "@/components/common/PrButton/PrButtonV2";
import useBookingData from "@/hooks/useBooking/useBooking";
import { BookingT } from "./booking.types";
import PrCircularProgressIndicator from "@/components/common/Loader/PrCircularProgressIndicator";
interface BookingDetailModalProps {
    bookingId: string;
}




const RoomsSelectedComponent = (props: string[]) => {
    const distinctValues: string[] = _.uniq(props);

    const chunkedValues = _.chunk(distinctValues, 2);

    return (
        <div >
            {chunkedValues.map((chunk, rowIndex) => (
                <div key={rowIndex} className="flex">
                    {chunk.map((value, index) => (
                        <div key={index} className="flex-1 mb-3">
                            <div className="flex">
                                <div className='font-bold'>{_.filter(props, item => item === value).length} X </div>
                                <div className='bg-black text-white rounded-full p-2 text-center'>{value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}





function BookingDetailModal({ bookingId }: BookingDetailModalProps) {
    const [openModal, setOpenModal] = useState(true);
    
    const {loading,bookingHashMap}=useBookingData(); 

    const singleBookingData = bookingHashMap[bookingId];

    console.log()
    const dataMemo = useMemo(() => {
      if (!singleBookingData) return [];
    
      return {
        booking_id: singleBookingData?.booking_id,
        customer_name: singleBookingData?.customerDetails.first_name,
        property_name: singleBookingData?.propertyDetails.property_name,
        check_in: singleBookingData?.check_in,
        booking_date: singleBookingData?.booking_date,
        check_out: singleBookingData?.check_out,
        final_amount: singleBookingData?.total_amount,
        commission: singleBookingData?.convenience_charge,
        tax_amount: 12,
        payment_status: singleBookingData?.payment_status,
        guest_count: singleBookingData?.no_of_childrens + singleBookingData?.no_of_adults,
        booking_status: singleBookingData?.booking_status,
        check_in_status: singleBookingData?.check_in_status,
      };
    }, [singleBookingData]) as any;
    



    const handleModal = () => {
        setOpenModal(!openModal);
    };


    return (
        <PrModal
            isOpen={openModal}
            onClose={handleModal}
            title={`Booking Detail (${bookingId})`}
            children={loading ?
               <div className="h-1/2 ">
                 <PrCircularProgressIndicator/>
               </div>
                :
                <div className="w-full">
                    <div className="flex space-x-2 p-4 ">
                        <div className="flex-1">
                            <div className="font-semibold">Booking Id</div>
                            <div>{dataMemo?. booking_id}</div>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">Customer Name</div>
                            <div>{dataMemo?.customer_name}</div>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">Property Name</div>
                            <div>{dataMemo?.property_name}</div>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">Room Type</div>
                            {RoomsSelectedComponent(dataMemo?.selectedRoomTypes as string[])}
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">Guest Count</div>
                            <div className="font-bold">{dataMemo?.guest_count}</div>
                        </div>

                    </div>
                    <div className="flex space-x-2 mt-3 p-4 ">
                        <div className="flex-1">
                            <div className="font-semibold">Booking On</div>
                            <div><DateFormat date={dataMemo?.booking_date as string} formatType={"dd MMM yyyy"}></DateFormat></div>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">Check-IN</div>
                            <div><DateFormat date={dataMemo?.check_in as string} formatType={"dd MMM yyyy"}></DateFormat></div>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">Check-Out</div>
                            <div><DateFormat date={dataMemo?.check_out as string} formatType={"dd MMM yyyy"}></DateFormat></div>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">Booking Status</div>
                            <div><BookingComponentStatusColor data={dataMemo?. booking_status as bookingStatusT}></BookingComponentStatusColor></div>
                        </div>
                        <div className="flex-1">
                            <PrLabel text="Check-In-Status"></PrLabel>
                            <div ><CheckInStatusComponentColor data={dataMemo?.check_in_status as checkInStatusT} ></CheckInStatusComponentColor></div>
                        </div>

                    </div>
                    <div className="border-b-2 border-gray-300 mt-8"></div>
                    <div className="mt-6 p-3 font-bold text-[18px]"> Payment Details</div>
                    <div className="flex space-x-2  p-3">
                        <div className="flex-1">
                            <PrLabel text={'Total Amount'} />
                            <div>{dataMemo?.final_amount}</div>
                        </div>
                        <div className="flex-1">
                            <PrLabel text={`Tax`} />
                            <div>{dataMemo?.tax_amount}</div>
                        </div>
                        <div className="flex-1">
                            <PrLabel text={"Commission"}></PrLabel>
                            <div><ComissionCellComponentColor data={dataMemo?.commission} ></ComissionCellComponentColor></div>
                        </div>
                        <div className="flex-1">
                            <PrLabel text={"Payment Status"}></PrLabel>
                            <div ><PaymentStatusCellComponentColor data={dataMemo?.payment_status as PaymentStatusT} ></PaymentStatusCellComponentColor></div>
                        </div>

                    </div>
                    <div className="mt-16 mx-auto flex justify-center items-center">
                        <PrButtonV2 label={"Ok"} buttonStyle='danger' onClick={handleModal} className='rounded-md w-[20%]'></PrButtonV2>
                    </div>

                </div>
                
            
        }
        />
    );
}

export default BookingDetailModal;
