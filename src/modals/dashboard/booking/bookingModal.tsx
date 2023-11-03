import PrTable from "@/components/common/PrTable/PrTable";
import products from '../../common/booking_data.json';
import DateFilter from "@/components/common/DateFilter/dateFilter";
import { H1 } from "@/components/common/Header/header";
import PrButton from "@/components/common/PrButton/PrButton";
import PrSearch from "@/components/common/PrSearch/PrSearch";
import { LANG } from "@/components/lang/Lang";
import {  BookingComponentStatus, CheckInStatusComponent, RoomsSelectedComponent } from "./common/bookingComponent";
import { CheckInCellComponent } from "../payment/paymentModal";
import PrPagination from "@/components/common/PrPagination/PrPagination";
import { useFilteredPagination } from "@/components/common/PrPagination/PrPaginationCalculator";
import { TableCellPropsT } from "@/components/common/PrTable/PrTableCommon";
import generateExcelAndDownload from '../../../components/services/ExcelDownloader';
import PrIcon from "@/components/common/PrIcon/PrIcon";
import { useEffect, useMemo, useState } from "react";
import BookingDetailModal from "./common/bookingDetailModal";
import { useDebounce } from "@uidotdev/usehooks";
import { CriteriaFilterPayload, FilterCriteria } from "@/components/helper/criteriaFilter";
import PrRowPagination from "@/components/common/PrPagination/PrRowPagination";

interface BookingModalT {
   calendarStartDate: Date | null; 
   calendarEndDate: Date | null;
 }
 

 const initialBookingModalData: BookingModalT = {
   calendarStartDate: null,
   calendarEndDate: null,
 };
 

function BookingModal(){

    const [bookingModalData,setBookingModalData]=useState<BookingModalT>(initialBookingModalData);
    const [openModal,setOpenModal]=useState(false);
    const [itemsPerPage,setItemsPerPage]=useState<number>(10);
    const  [bookingId,setBookingId]=useState('');
    const {currentPage,visibleData,handlePageChange,totalPages} =useFilteredPagination(products,'',itemsPerPage);
    const DateFilterMemo=useMemo(()=>{
      const filter:FilterCriteria[]=[{
         field:'booking_date',
         operator:'BETWEEN',
         value:{startDate:bookingModalData.calendarStartDate,
                endDate:bookingModalData.calendarEndDate},
      }];
      return CriteriaFilterPayload(filter);
    },[bookingModalData.calendarEndDate,bookingModalData.calendarStartDate])

    const DateFilterPayload=useDebounce(DateFilterMemo,500);

    useEffect(()=>{
      
    },[DateFilter])


    const handleModal = (data:string)=>{
        setBookingId(data)
        setOpenModal(!openModal)
    }

    const BookingActionComponent:React.FC<TableCellPropsT>=(props)=>{

      return(
          <div>
              <PrIcon name={'Eye'} className="cursor-pointer" color='blue' onClick={()=>handleModal(props.rowData.bookingId)} ></PrIcon>
          </div>
      );
  }

  const handleState = (payload: Partial<BookingModalT>) => {
   setBookingModalData((prevState) => ({
     ...prevState,
     ...payload
   }));
 };
 
  const  handleDateRangeChange=(startDate: Date |null, endDate: Date|null): void =>{
   handleState({
      calendarEndDate:endDate,
      calendarStartDate:startDate
   });
  }
    return(
        <div><div className="h-[4rem] flex">
        <H1>{LANG.COMMON.BOOKINGMANAGEMENT}</H1>
        <div className="ml-auto flex items-center space-x-4">
            <PrSearch onSearch={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
            }} value={''}></PrSearch>
            <PrButton label={'Download'} iconName={'Download'} buttonStyle='primary' onClick={()=>generateExcelAndDownload(visibleData, 'booking')}></PrButton>
            <DateFilter onDateRangeChange={handleDateRangeChange} options={[]} value={""} onChange={function (value: any): void {
                throw new Error("Function not implemented.");
             } }></DateFilter>
            <PrRowPagination
                        totalRows={totalPages}
                        currentPageData={visibleData}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage} 
                        onItemsPerPageChange={(itemsPerPage) => {
                            setItemsPerPage(itemsPerPage)
                        }}/>
            <PrPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange }></PrPagination>
        </div>
    </div>
         <PrTable headers={[{
            id:'index',
            name:'#',
         },
         {
            id:'bookingId',
            name:'Booking Id'
         },
         {
            id:'customerName',
            name:'Customer Name'
         },
         {
            id:'propertyName',
            name:'Property Name'
         },
         {
            id:'selectedRoomTypes',
            name:'Rooms Selected',
            renderComponent:RoomsSelectedComponent,
            renderProps:{dataField:'selectedRoomTypes'},
            width:'w-64'
         },
         {
            id:'checkIn',
            name:'Check In',
            renderComponent:CheckInCellComponent,
            renderProps:{dataField:'checkIn'}
         },
         {
            id:'checkOut',
            name:'Check Out',
            renderComponent:CheckInCellComponent,
            renderProps:{dataField:'checkout'}
         },
         {
            id:'finalAmount',
            name:'Final Amount'
         },
         {
            id:'bookingStatus',
            name:'Booking Status',
            renderComponent:BookingComponentStatus,
            renderProps:{dataField:'bookingStatus'}
         },
         {
            id:'checkInStatus',
            name:'Check-In-Status',
            renderComponent:CheckInStatusComponent,
            renderProps:{dataField:'checkInStatus'}
         },
         {
            id:'action',
            name:'Action',
            renderComponent:BookingActionComponent,
            renderProps:{dataField:'action'},
         }
         ]} data={visibleData}></PrTable>
         {openModal && <BookingDetailModal bookingId={bookingId}></BookingDetailModal>}
        </div>
    );
}
export default BookingModal;