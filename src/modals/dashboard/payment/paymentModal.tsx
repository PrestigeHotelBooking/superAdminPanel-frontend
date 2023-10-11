import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import products from "../../common/booking_data.json";
import { useDebounce } from "@uidotdev/usehooks";
import _ from "lodash";
import DateFilter from "@/components/common/DateFilter/dateFilter";
import DateFormat from "@/components/common/DateFormat/dateFormat";
import { H1 } from "@/components/common/Header/header";
import PrButton from "@/components/common/PrButton/PrButton";
import PrIcon from "@/components/common/PrIcon/PrIcon";
import PrSearch from "@/components/common/PrSearch/PrSearch";
import PrTable from "@/components/common/PrTable/PrTable";
import { TableCellPropsT } from "@/components/common/PrTable/PrTableCommon";
import { LANG } from "@/components/lang/Lang";
import {
  userModalInputT,
  initialuserModalInput,
} from "../user/common/userCommon";
import { PaymentStatusT, RefundStatusT, getPaymentStatusBackgroundColor, getRefundStatusColor } from "./common/paymentCommon";
import PrPagination from "@/components/common/PrPagination/PrPagination";
import { useFilteredPagination } from "@/components/common/PrPagination/PrPaginationCalculator";
import  generateExcelFromJSON  from '@/components/services/ExcelDownloader';

export interface ComissionCellComponentProps {
  data: any;
}
export const ComissionCellComponentColor: React.FC<ComissionCellComponentProps> = ({ data }) => {
  if (data === null) {
    return null; // Render nothing if data is null
  }

  return (
    <div className="flex space-x-2">
      <div className="bg-[#3572F4] text-white p-2 w-[12rem] text-center rounded-full">
        ₹{data.amount}
      </div>
      <div className="bg-[#48B549] text-white p-2 rounded-full text-center">
        {data.percentage}%
      </div>
    </div>
  );
};

export const ComissionCellComponent :React.FC<TableCellPropsT> = (data) =>{
    return(
      <ComissionCellComponentColor data={data.data} />
    );
}

const RefundStatusCellComponent : React.FC<TableCellPropsT> = (data) =>{
    const { textColor, backgroundColor } = getRefundStatusColor[data.data as RefundStatusT ];

    return (
       <div className="flex">
        <div className={`w-4 h-4 rounded-full ${backgroundColor}`}></div>
         <div className={`ml-2 font-bold ${textColor}`}>
            {data.data}
        </div>
       </div>
    );
}


interface PaymentStatusCellComponentColorProps {
  data: PaymentStatusT;
}

export const PaymentStatusCellComponentColor: React.FC<PaymentStatusCellComponentColorProps> = ({ data }) => {
  const bgColor = getPaymentStatusBackgroundColor(data);
  
  return (
    <div className={`${bgColor} rounded-full text-white ml-2 p-2 text-center`}>
      {data}
    </div>
  );
};

const PaymentStatusCellComponent: React.FC<TableCellPropsT> = (data) => {
   return <PaymentStatusCellComponentColor data={data.data} />;
};


export const CheckInCellComponent:React.FC<TableCellPropsT>=(data)=>{
    return(
        <DateFormat date={data.data} className="text-black" formatType="dd MMM yyyy" />
    );
}

const checkOutTimeCellComponent:React.FC<TableCellPropsT>=(data)=>{
    return(
        <DateFormat date={data.data} className="text-black" formatType="dd MMM yyyy" />
    );
}





const PaymentModal = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<userModalInputT>(
      initialuserModalInput
    );
    
    const searchText = useDebounce(userData.searchText, 2);
    
  const handleState = (data: Partial<userModalInputT>) => {
    setUserData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };


    

    const handleDateRangeChange = (
        startDate: Date | null,
        endDate: Date | null
      ) => {
        handleState({ calendarStartDate:startDate,
                calendarEndDate: endDate });
      };

    useEffect(()=>{
      
    },[])

      const {visibleData, totalPages, currentPage,handlePageChange} = useFilteredPagination(products,searchText,10);
   
  


    return (
      <div className="p-3 ">

        <div className="h-[4rem] flex">
        <H1>{LANG.COMMON.PAYMENTMANAGEMENT}</H1>
        <div className="ml-auto flex items-center space-x-4">
          <DateFilter onDateRangeChange={handleDateRangeChange} />
          <PrButton label={"Excel"} iconName={"Download"}  onClick={()=>generateExcelFromJSON(visibleData, 'paymentData')}/>
          <PrSearch
            value={userData.searchText}
            onSearch={(e) => handleState({ searchText: e.target.value })}
          ></PrSearch>
         
         <PrPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        </div>
      </div>
      <div className="h-full mb-2">
      <PrTable
        headers={[
          {
            id: "index",
            name: "#",
            width:'1rem'
          },
          {
            name: "Booking Id",
            id: "bookingId",
          },
          {
            name: "Customer Name",
            id: "customerName",
          },
          {
            name: "Property Name",
            id: "propertyName",
          },
          {
            name: "Check In",
            id: "checkIn",
            renderComponent:CheckInCellComponent,
            renderProps:{dataField:'checkIn'}
          },
          {
            name: "Check Out",
            id: "checkOut",
            renderComponent:checkOutTimeCellComponent,
            renderProps:{dataField:'checkOut'}
          },
          {
            name: "Final Amount",
            id: "finalAmount",
          },
          {
            name: "Tax Amount",
            id: "taxAmount",
          },
          {
            name: "Commission",
            id: "commission",
            renderComponent:ComissionCellComponent,
            renderProps:{dataField:'commission'}
          },
          {
            name: "Payment Status",
            id: "paymentStatus",
            renderComponent:PaymentStatusCellComponent,
            renderProps:{dataField:'paymentStatus'}
          },
          {
            name: "Refund Status",
            id: "refundStatus",
            renderComponent:RefundStatusCellComponent,
            renderProps:{dataField:'refundStatus'}
          },
        ]}
        data={visibleData}
      />
      </div>
      </div>
    );
  };
  
  export default PaymentModal;
  