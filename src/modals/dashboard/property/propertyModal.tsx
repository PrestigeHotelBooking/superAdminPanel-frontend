import React, { useEffect, useState } from 'react';
import {H1} from '../../../components/common/Header/header';
import PrSearch from '../../../components/common/PrSearch/PrSearch';
import PrButton from '../../../components/common/PrButton/PrButton';
import PrTable from '../../../components/common/PrTable/PrTable';
import DateFilter from '../../../components/common/DateFilter/dateFilter';
import { LANG } from '../../../components/lang/Lang';
import AddProperty from './common/addProperty';
import { AddressCell, GpsLocationCell, AvilableCell, ActionCell } from './common/propertyTableComponents';
import { BackendGet } from '@/components/services/BackendServices';
import { ENDPOINTS } from '@/components/lang/EndPoints';
import usePropertyList from '@/hooks/useProperty/usePropertyList';




const PropertyModal = () => {

    const [openAddProperty,setOpenAddProperty]=useState(false);
    const [propertyData,setPropertyData]=useState<any>([]);
    const handleAddProperty = ()=>{
        setOpenAddProperty(!openAddProperty);
    }
    const {data,loading}=usePropertyList();

    useEffect(()=>{
        if(!loading){
            setPropertyData(data)
        }
    },[data])
  
    
    return (
        <div className="p-3">
            <div className="h-[4rem] flex">
                <H1>{LANG.COMMON.PROPERTYMANGEMENT}</H1>
                <div className="ml-auto flex items-center space-x-4">
                    <PrSearch onSearch={function (e: React.ChangeEvent<HTMLInputElement>): void {
                        throw new Error('Function not implemented.');
                    }} value={''}></PrSearch>
                    <PrButton label={'Add'} iconName={'Plus'} onClick={handleAddProperty}  buttonStyle='primary'></PrButton>
                    <DateFilter onDateRangeChange={function (startDate: Date | null, endDate: Date | null): void {
                        throw new Error('Function not implemented.');
                    }}></DateFilter>
                </div>
            </div>
            <PrTable
                headers={[
                    {
                        id: 'propertyID',
                        name: '#'
                    },
                    {
                        name: 'Property Name',
                        id: 'propertyName'
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
                data={propertyData}

            ></PrTable>

            {openAddProperty && <AddProperty closeModal={handleAddProperty}></AddProperty>}
        </div>
    );
}

export default PropertyModal;
