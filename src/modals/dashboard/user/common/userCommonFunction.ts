import { ENDPOINTS } from "@/components/lang/EndPoints";
import { BackendPost } from "@/components/services/BackendServices"
import { userDetailInputT } from "./userCommon";
import { FilterCriteria } from "@/components/helper/criteriaFilter";
import { DateFilterT } from "@/modals/common/filter";





export const filterBasedOnDate= async (userDetailInput:DateFilterT,id:string)=>{

    const filter:FilterCriteria[]=[{
        field: userDetailInput.calenderColumn,
        operator:'BETWEEN',
        value: {startDate:userDetailInput.calendarStartDate,endDate:userDetailInput.calendarEndDate},
        logicalOperator:'AND'
    },
];
    const data = await BackendPost(`${ENDPOINTS.USER.SINGLE_CUSTOMER_BOOKING}/${id}`,{filter});
    return data['responseData']?.message;
}



export const filterBasedOnDateWithUserList= async (userDetailInput:DateFilterT)=>{

    const filter:FilterCriteria[]=[{
        field: userDetailInput.calenderColumn,
        operator:'BETWEEN',
        value: {startDate:userDetailInput.calendarStartDate,endDate:userDetailInput.calendarEndDate},
        logicalOperator:'AND'
    },
];
    const data = await BackendPost(`${ENDPOINTS.USER.GET_USER}`,{filter});
    console.log(data)
    return data['responseData']?.message;
}