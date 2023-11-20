import React, { useEffect, useMemo, useState } from 'react';
import { H1 } from '../../../components/common/Header/header';
import PrSearch from '../../../components/common/PrSearch/PrSearch';
import PrButton from '../../../components/common/PrButton/PrButton';
import PrTable from '../../../components/common/PrTable/PrTable';
import DateFilter from '../../../components/common/DateFilter/dateFilter';
import { LANG } from '../../../components/lang/Lang';
import AddProperty from './common/components/addProperty';
import { AddressCell, GpsLocationCell, AvilableCell, handleView, handleEdit } from './common/components/propertyTableComponents';
import { BackendDelete, BackendPost } from '../../../components/services/BackendServices';
import { ENDPOINTS } from '../../../components/lang/EndPoints';
import usePropertyList, { PropertyApiResponse } from '../../../hooks/useProperty/usePropertyList';
import PrCircularProgressIndicator from '../../../components/common/Loader/PrCircularProgressIndicator';
import { CriteriaFilterPayload, FilterCriteria } from '../../../components/helper/criteriaFilter';
import { useDebounce } from '../../../hooks/useDebounce/useDebounce';
import { ToastContainer, toast } from 'react-toastify';
import { TableCellPropsT } from '../../../components/common/PrTable/PrTableCommon';
import PrIconV2 from '../../../components/common/PrIcon/PrIconV2';
import PrDeleteModalBox from '../../../components/common/PrModalBox/PrDeleteModalBox';
import { useFilteredPagination } from '../../../components/common/PrPagination/PrPaginationCalculator';
import PrPagination from '../../../components/common/PrPagination/PrPagination';
import PrRowPagination from '../../../components/common/PrPagination/PrRowPagination';
import { DateFilterT, SearchFilterT } from '@/modals/common/filter';
import { propertyDateFilterOption, propertySearchFilterOption } from './common/helper/propertyCommon';
import {useDateFilter} from '@/components/common/DateFilter/useDateFilter';


interface PropertyModalT {
    datePicker: DateFilterT;
    searchPicker: SearchFilterT;
    propertyData: any;
    deleteId: string
}


const initialPropertyModalData: PropertyModalT = {
    datePicker: {
        calenderColumn: '',
        calendarEndDate: null,
        calendarStartDate: null,
        calenderColumnOptions:propertyDateFilterOption
    },
    searchPicker: {
        searchOption: [],
        searchOptionValue: '',
        searchText: ''
    },
    propertyData: [],
    deleteId: ''
};




const PropertyModal = () => {


    const [propertyModalData, setPropertyModalData] = useState<PropertyModalT>(initialPropertyModalData);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [openAddProperty, setOpenAddProperty] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { data, loading, fetchPropertyList } = usePropertyList();
    const searchText = useDebounce(propertyModalData['searchPicker']?.searchText, 500);
    const { currentPage, visibleData, handlePageChange, totalPages } = useFilteredPagination(propertyModalData.propertyData, '', itemsPerPage);

    const handleAddProperty = () => {
        setOpenAddProperty(!openAddProperty);
    }


    const handleState = (payload: Partial<PropertyModalT>) => {
        setPropertyModalData((prevState) => ({
            ...prevState,
            ...payload
        }));
    };




    const ActionCell: React.FC<TableCellPropsT> = (props) => {

        return (
            <div className='flex space-x-2'>
                <PrIconV2 name={'RemoveRedEyeSharp'} color='blue' onClick={() => handleView(props?.rowData?.property_id)} ></PrIconV2>
                <PrIconV2 name={'Edit'} color='blue' onClick={() => handleEdit(props?.rowData?.property_id)}></PrIconV2>
                <PrIconV2 name={'Delete'} color='blue' onClick={() => handleDelete(props?.rowData?.property_id)}></PrIconV2>
            </div>
        );
    }

    const handleDelete = (id: string) => {
        setIsDeleteModalOpen(true);
        handleState({ deleteId: id });
    };


    const handleDeleteConfirmed = async (id: string) => {
        const deleteData = await BackendDelete(`${ENDPOINTS.PROPERTY.DELETE}/${id}`);
        if (deleteData.success) {
            fetchPropertyList();
            toast.success('Delete the property successfully', {});
        }
        else {
            toast.error('Unable to delete the property', {});
        }
        setIsDeleteModalOpen(false);
    };


    const DateFilterMemo = useMemo(() => {
        const filter: FilterCriteria[] = [{
            field: propertyModalData?.datePicker?.calenderColumn,
            operator: 'BETWEEN',
            value: {
                startDate: propertyModalData['datePicker']?.calendarStartDate,
                endDate: propertyModalData['datePicker']?.calendarEndDate
            },
        }];
        return filter;
    }, [propertyModalData['datePicker']?.calendarStartDate, propertyModalData['datePicker']?.calendarEndDate]);




    const searchTextMemo = useMemo(() => {
        const filter: FilterCriteria[] = [{
            field: 'property_name',
            operator: 'LIKE',
            value: searchText
        }]
        return filter;
    }, [searchText]);

    const handleDateRangeChange = (startDate: Date | null, endDate: Date | null): void => {
        handleState({
            datePicker: {
                ...propertyModalData?.datePicker,
                calendarStartDate: startDate,
                calendarEndDate: endDate,
            }
        });
    }


    useMemo(() => {
        handleState({ propertyData: data });
    }, [loading, data]);

    const fetchData = async () => {
        try {
            const data = await BackendPost<PropertyApiResponse>(ENDPOINTS.PROPERTY.GET, { filter: searchTextMemo });
            if (typeof data === 'object' && data !== null) {
                const dataMessageWithAddress = data?.responseData['message']?.map((d: any) => ({
                    ...d,
                    address: {
                        addressLine1: d.property_addressLine1 || '',
                        addressLine2: d.property_addressLine1 || ''
                    }
                })) ?? [];
                handleState({ propertyData: dataMessageWithAddress });
            }
        } catch (error) {
            handleState({ propertyData: [] });
        }
    };

    const fetchDataWithDateFilter = async () => {
        try {
            const data = await BackendPost<PropertyApiResponse>(ENDPOINTS.PROPERTY.GET, { filter: DateFilterMemo });
            if (typeof data === 'object' && data !== null) {
                const dataMessageWithAddress = data?.responseData['message']?.map((d: any) => ({
                    ...d,
                    address: {
                        addressLine1: d.property_addressLine1 || '',
                        addressLine2: d.property_addressLine1 || ''
                    }
                })) ?? [];
                handleState({ propertyData: dataMessageWithAddress });
            }
        } catch (error) {
            handleState({ propertyData: [] });
        }
    };

    const checking=useDateFilter(fetchDataWithDateFilter,propertyModalData['datePicker'])
    console.log(checking,{propertyModalData:propertyModalData['datePicker']});

    useEffect(() => {
        fetchData();
    }, [searchText]);

    const handleClear = () => {
        handleState({ propertyData: data })
    }





    return (
        <div className="p-3">
            <div className="h-[4rem] flex">
                <H1>{LANG.COMMON.PROPERTYMANGEMENT}</H1>
                <div className="ml-auto flex items-center space-x-4">
                    <PrSearch onSearch={(e) => handleState({
                        searchPicker: {
                            ...propertyModalData.searchPicker,
                            searchText: e.target.value
                        }
                    })} value={propertyModalData['searchPicker']?.searchText}
                        onClear={handleClear}
                        prSelectOption={propertySearchFilterOption}
                        prSelectValue={propertyModalData?.searchPicker?.searchOptionValue}
                        prOnChange={(value: string) => {
                            
                            handleState({
                                searchPicker: {
                                    ...propertyModalData.searchPicker,
                                    searchOptionValue: value
                                }
                            })
                        }}
                    />
                    <PrButton label={'Add'} iconName={'Plus'} onClick={handleAddProperty} buttonStyle='primary'></PrButton>
                    <DateFilter onDateRangeChange={handleDateRangeChange}
                        options={propertyModalData?.datePicker?.calenderColumnOptions}
                        value={propertyModalData?.['datePicker']?.calenderColumn}
                        onChange={(value: string) => {
                            console.log(value);
                            handleState({
                                datePicker: {
                                    ...propertyModalData?.datePicker,
                                    calenderColumn: value
                                }
                            })
                        }}
                        onClear={handleClear}
                    />
                    <PrRowPagination
                        totalRows={totalPages}
                        currentPageData={visibleData}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onItemsPerPageChange={(itemsPerPage) => {
                            setItemsPerPage(itemsPerPage)
                        }} />
                    <PrPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}></PrPagination>
                </div>
            </div>
            {
                loading ? <PrCircularProgressIndicator />
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
                                renderComponent: AddressCell,
                                renderProps: { dataField: 'address' }
                            },
                            {
                                name: 'Gps Location',
                                id: 'gps',
                                renderComponent: GpsLocationCell,
                                renderProps: { dataField: 'gps' }
                            },
                            {
                                name: 'Number Of Rooms',
                                id: 'property_totalNoOfRooms',
                            },
                            {
                                name: 'Avilable',
                                id: 'Available',
                                renderComponent: AvilableCell,
                                renderProps: { dataField: 'Available' }
                            },
                            {
                                name: 'Action',
                                id: 'Action',
                                renderComponent: ActionCell,
                                renderProps: { dataField: 'Action' }
                            }
                        ]}
                        data={visibleData}

                    ></PrTable>
            }

            {openAddProperty && <AddProperty closeModal={handleAddProperty}></AddProperty>}
            <PrDeleteModalBox
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={() => handleDeleteConfirmed(propertyModalData.deleteId)}
                name="Property"
            />


            <ToastContainer />
        </div>
    );
}

export default PropertyModal;
