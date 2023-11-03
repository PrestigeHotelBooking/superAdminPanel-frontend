    import React, { useEffect, useMemo, useState } from 'react';
    import { useRouter } from 'next/router';
    import products from './sampleProduct';
    import { dateFilterUserOption, initialuserModalInput, userModalInputT } from './common/userCommon';
    import { useDebounce } from '@uidotdev/usehooks';
    import _ from 'lodash';
    import DateFilter from '@/components/common/DateFilter/dateFilter';
    import DateFormat from '@/components/common/DateFormat/dateFormat';
    import { H1 } from '@/components/common/Header/header';
    import PrButton from '@/components/common/PrButton/PrButton';
    import PrIcon from '@/components/common/PrIcon/PrIcon';
    import PrSearch from '@/components/common/PrSearch/PrSearch';
    import PrTable from '@/components/common/PrTable/PrTable';
    import { TableCellPropsT } from '@/components/common/PrTable/PrTableCommon';
    import { LANG } from '@/components/lang/Lang';
    import  generateExcelFromJSON  from '@/components/services/ExcelDownloader';
    import PrCircularProgressIndicator from '@/components/common/Loader/PrCircularProgressIndicator';
    import { BackendGet, BackendPost } from '@/components/services/BackendServices';
    import { ENDPOINTS } from '@/components/lang/EndPoints';
    import { useDispatch } from 'react-redux';
    import useCustomerData from '@/hooks/useCustomerData/useCustomerData';
    import PrPagination from '@/components/common/PrPagination/PrPagination';
    import { useFilteredPagination } from '@/components/common/PrPagination/PrPaginationCalculator';
    import PrRowPagination from '@/components/common/PrPagination/PrRowPagination';
    import PrSelect from '@/components/common/PrSelect/PrSelect';
    import { isStringNotEmpty } from '@/components/helper/validator';
import { FilterCriteria } from '@/components/helper/criteriaFilter';

    const TotalBookingText: React.FC<TableCellPropsT> = ({ data }) => {
        return (
            <label className='font-bold text-black text-[18px]'>{data}</label>
        );
    };

    const JoinedDateText: React.FC<TableCellPropsT> = ({ data }) => {
        return (
            <DateFormat date={data} formatType="dd MMM yyyy" className="text-black" />
        );
    };





    const UserModal = () => {
        const router = useRouter();
        const [userData, setUserData] = useState<userModalInputT>(initialuserModalInput);
        const [itemsPerPage,setItemsPerPage]=useState<number>(10);
        const searchText = useDebounce(userData.searchText, 100);
        const {data,loading,getCustomerData}=useCustomerData();

        useEffect(()=>{
            handleState({userData:data })
        },[data])


        const handleEditClick = (id: string) => {
            router.push(`/dashboard/userdetail/${id}`);
        };

        const EditButton: React.FC<TableCellPropsT> = ({ rowIndex, rowData }) => {
            return (
                <div onClick={() => handleEditClick(rowData?.customer_id)} className='cursor-pointer'>
                    <PrIcon name={'Eye'} color='blue' ></PrIcon>
                </div>
            );
        };

        const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
            handleState({ calendarStartDate : startDate,calendarEndDate:endDate });
        };

        useEffect( ()=>{
            if(isStringNotEmpty(searchText)){
                getFilteredData();
            }
        },[searchText]);


        const getFilteredData = async ()=>{
            const filter:FilterCriteria[]=[{
                field:'customer_id',
                operator:'LIKE',
                value:searchText,
                logicalOperator:'OR'
            },
            {
                field:'first_name',
                operator:'LIKE',
                value:searchText,
                logicalOperator:'OR'
            },
            {
                field:'last_name',
                operator:'LIKE',
                value:searchText,
                logicalOperator:'OR'
            },
            {
                field:'phone_number',
                operator:'LIKE',
                value:searchText,
                logicalOperator:'OR'
            }, 
            {
                field:'email_id',
                operator:'LIKE',
                value:searchText,
                logicalOperator:'OR'
            }  
        ]
            const user = await BackendPost(`${ENDPOINTS.USER.GET_USER}`,{filter:filter});
            handleState({ userData:user['responseData']['message'] })
        }

        const handleState = (data: Partial<userModalInputT>) => {
            setUserData((prevState) => ({
                ...prevState,
                ...data
            }));
        }

        const {currentPage,visibleData,handlePageChange,totalPages} =useFilteredPagination(userData.userData,'',itemsPerPage);

        return (
            <div className="p-3">
                <div className="h-[5rem] flex">
                    <H1>{LANG.COMMON.USERMANAGEMENT}</H1>
                    <div className="ml-auto flex items-center space-x-4">
                        <DateFilter onDateRangeChange={handleDateRangeChange} options={dateFilterUserOption} value={userData.dateFilterColumn} onChange={(value)=>{ handleState({ dateFilterColumn:value }) }} />
                        <PrButton label={'Excel'} iconName={'Download'} onClick={()=>generateExcelFromJSON(visibleData, 'userdetail')} />
                        <PrRowPagination
                        totalRows={totalPages}
                        currentPageData={visibleData}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage} 
                        onItemsPerPageChange={(itemsPerPage) => {
                            setItemsPerPage(itemsPerPage);
                            handlePageChange(1);
                        }}/>
                        <PrSearch
                            value={userData.searchText}
                            onSearch={(e) => handleState({ searchText: e.target.value })} ></PrSearch>
                                  <PrPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange }></PrPagination>
                    </div>
                </div>
 
                {loading  ? <PrCircularProgressIndicator /> :         <PrTable
                        headers={[
                            {
                                id: 'customer_id',
                                name: 'Customer Id'
                            },
                            {
                                name: 'First Name',
                                id: 'first_name'
                            },
                            {
                                name: 'Last Name',
                                id: 'last_name'
                            },
                            {
                                name: 'Mobile Number',
                                id: 'phone_number'
                            },
                            {
                                name: 'Email Address',
                                id: 'email_id'
                            },
                            {
                                name: 'Total Bookings',
                                id: 'booking_count',
                                renderComponent: TotalBookingText,
                                renderProps: { dataField: 'booking_count' }
                            },
                            {
                                name: 'Joined Date',
                                id: 'created_at',
                                renderComponent: JoinedDateText,
                                renderProps: { dataField: 'created_at' }
                            },
                            {
                                name: 'Action',
                                id: 'Edit',
                                renderComponent: EditButton,
                                renderProps: { dataField: 'Edit' }
                            }
                        ]}
                        data={visibleData}
                        refreshButton={getCustomerData}
                    />
                    
                    }
            
            </div>
        );
    };

    export default UserModal;
