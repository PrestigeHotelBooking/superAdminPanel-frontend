import React, { useEffect, useMemo, useState } from 'react';
import {H1} from '../../../components/common/Header/header';
import PrSearch from '../../../components/common/PrSearch/PrSearch';
import PrButton from '../../../components/common/PrButton/PrButton';
import PrTable from '../../../components/common/PrTable/PrTable';
import DateFilter from '../../../components/common/DateFilter/dateFilter';
import { LANG } from '../../../components/lang/Lang';
import AddProperty from './common/addProperty';
import { AddressCell, GpsLocationCell, AvilableCell, ActionCell } from './common/propertyTableComponents';
import { BackendGet, BackendPost } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints';
import usePropertyList, { PropertyApiResponse } from '@/hooks/useProperty/usePropertyList';
import { PropertyDataT } from './common/property.types';
import PrCircularProgressIndicator from '@/components/common/Loader/PrCircularProgressIndicator';
import { CriteriaFilterPayload, FilterCriteria } from '@/components/helper/criteriaFilter';
import { useDebounce } from '@/hooks/useDebounce/useDebounce';

// import propertyData from '../../common/property_data.json';
interface PropertyModalT {
    calendarStartDate: Date | null; 
    calendarEndDate: Date | null;
    searchText:string;
    propertyData:any;
  }
  
 
  const initialPropertyModalData: PropertyModalT = {
    calendarStartDate: null,
    calendarEndDate: null,
    searchText:'',
    propertyData:[]
  };
  
const PropertyModal = () => {

    const [openAddProperty,setOpenAddProperty]=useState(false);
    const [propertyModalData,setPropertyModalData]=useState<PropertyModalT>(initialPropertyModalData);
    const searchText=useDebounce(propertyModalData.searchText,500);

    const handleAddProperty = ()=>{
        setOpenAddProperty(!openAddProperty);
    }
    const {data,loading}=usePropertyList();

    const handleState = (payload: Partial<PropertyModalT>) => {
        setPropertyModalData((prevState) => ({
          ...prevState,
          ...payload
        }));
      };
      

      const DateFilterMemo=useMemo(()=>{
        const filter:FilterCriteria[]=[{
           field:'booking_date',
           operator:'BETWEEN',
           value:{startDate:propertyModalData.calendarStartDate,
                  endDate:propertyModalData.calendarEndDate},
        }];
        return CriteriaFilterPayload(filter);
      },[propertyModalData.calendarEndDate,propertyModalData.calendarStartDate]);
      const DateFilterPayload=useDebounce(DateFilterMemo,500);

      const searchTextMemo=useMemo(()=>{
        const filter:FilterCriteria[]=[{
            field:'property_name',
            operator:'LIKE',
            value:searchText
        }]
        return filter;
      },[searchText]);
     
  const  handleDateRangeChange=(startDate: Date |null, endDate: Date|null): void =>{
    handleState({
       calendarEndDate:endDate,
       calendarStartDate:startDate
    });
   }

   
   useMemo(()=>{
    handleState({ propertyData:data });
},[loading,data]);



   useMemo(async ()=>{
    const data = await BackendPost<PropertyApiResponse>(ENDPOINTS.PROPERTY.GET,searchTextMemo);
    if (typeof data === 'object' && data !== null) {
      const dataMessageWithAddress = data?.responseData['message']?.map((d:any) => ({
        ...d,
        address: {
          addressLine1: d.property_addressLine1 || '',
          addressLine2: d.property_addressLine1 || ''
        }
      }));
     handleState({ propertyData:dataMessageWithAddress })
    }
   },[searchText])


  

 
    
    return (
        <div className="p-3">
            <div className="h-[4rem] flex">
                <H1>{LANG.COMMON.PROPERTYMANGEMENT}</H1>
                <div className="ml-auto flex items-center space-x-4">
                    <PrSearch onSearch={(e)=>handleState({ searchText:e.target.value })} value={propertyModalData.searchText} ></PrSearch>
                    <PrButton label={'Add'} iconName={'Plus'} onClick={handleAddProperty}  buttonStyle='primary'></PrButton>
                    <DateFilter  onDateRangeChange={handleDateRangeChange}></DateFilter>
                </div>
            </div>
          {
            loading ? <PrCircularProgressIndicator/>
            : 
            <PrTable
            headers={[
                {
                    id: 'property_id',
                    name: '#'
                },
                {
                    name: 'Property Name',
                    id: 'property_name'
                },
                {
                    name: 'Address',
                    id: 'address',
                    renderComponent:AddressCell,
                    renderProps:{dataField:'address'}
                },
                {
                    name: 'Gps Location',
                    id: 'gps',
                    renderComponent:GpsLocationCell,
                    renderProps:{dataField:'gps'}
                },
                {
                    name:'Number Of Rooms',
                    id:'totalNoOfRooms',
                },
                {
                    name:'Avilable',
                    id:'Available',
                    renderComponent:AvilableCell,
                    renderProps:{dataField:'Available'}
                },
                {
                    name:'Action',
                    id:'Action',
                    renderComponent:ActionCell,
                    renderProps:{dataField:'Action'}
                }
            ]}
            data={propertyModalData.propertyData}

        ></PrTable>
          }

            {openAddProperty && <AddProperty closeModal={handleAddProperty}></AddProperty>}
        </div>
    );
}

export default PropertyModal;
