import { H1, H3 } from "@/components/common/Header/header";
import PrTable from "@/components/common/PrTable/PrTable";
import { TableCellPropsT } from "@/components/common/PrTable/PrTableCommon";
import Image from "next/image";
import PrIconV2 from "@/components/common/PrIcon/PrIconV2";
import DateFilter from "@/components/common/DateFilter/dateFilter";
import PrButton from "@/components/common/PrButton/PrButton";
import PrSearch from "@/components/common/PrSearch/PrSearch";
import { LANG } from "@/components/lang/Lang";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import AddContentModal from "./addContentModal";
import useContentData from "@/hooks/useContentData/useContentData";
import PrCircularProgressIndicator from "@/components/common/Loader/PrCircularProgressIndicator";
import { useFilteredPagination } from "@/components/common/PrPagination/PrPaginationCalculator";
import PrPagination from "@/components/common/PrPagination/PrPagination";
import { BackendDelete, BackendPost } from "@/components/services/BackendServices";
import { ENDPOINTS } from "@/components/lang/EndPoints";
import { toast } from "react-toastify";
import UpdateContentModal from "./updateContentModal";
import { contentDataT, initialContentModal } from "./helper";
import { useDateFilter, useSearchFilter } from "@/components/common/DateFilter/useDateFilter";
import { FilterCriteria } from "@/components/helper/criteriaFilter";

const ImageCellComponent = (props: TableCellPropsT) => {
    return (
        <div>
            <Image src={props.data} alt='content' width={100} height={100} ></Image>
        </div>
    );
}








function ContentModal() {

    const [openModal, setOpenModal] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [openUpdateModal, setUpdateModal] = useState(false);
    const [updateContentId, setUpdateContentId] = useState<number>(-1);
    const [contentData, setContentData] = useState<contentDataT>(initialContentModal);

    const { data, loading, getContentData } = useContentData();

    const { currentPage, visibleData, handlePageChange, totalPages } = useFilteredPagination(contentData?.contentModalData, '', itemsPerPage);


    const updateModalBox = () => {
        setUpdateModal(!openUpdateModal)
    }


    const handleState = (data: Partial<contentDataT>) => {
        setContentData((prevState) => ({
            ...prevState,
            ...data,
        }));
    };


    useEffect(()=>{
        if(!loading){
            handleState({ contentModalData:data });
        }
    },[loading])


    const handleModal = () => {
        setOpenModal(!openModal);
        getContentData();
    }


    const ActionCellComponent = (props: TableCellPropsT) => {
        const content_id = props?.rowData?.content_id;
        return (
            <div className="flex space-x-3">
                <PrIconV2 name={'Create'} size={'large'} color={'blue'} onClick={() => {
                    setUpdateContentId(content_id);
                    setUpdateModal(!openUpdateModal);
                }}></PrIconV2>
                <PrIconV2 name={'Delete'} size={'large'} color='blue' onClick={() => { deleteTheContent(content_id) }}></PrIconV2>

            </div>
        );
    }


    const deleteTheContent = async (id: string) => {

        const data = await BackendDelete(`${ENDPOINTS.CONTENT.DELETE}/${id}`);
        if (data.success) {
            toast.success(`Content has been deleted successfully`);
            setTimeout(() => { getContentData(); })
        }
        else {
            toast.error(`Unable to delete the content`);
        }

    }

    const handleDateRangeChange = (startDate: Date | null, endDate: Date | null): void => {

        const updatedDatePicker = {
            ...contentData.datePicker,
            calendarStartDate: startDate,
            calendarEndDate: endDate
        };

        handleState({
            datePicker: updatedDatePicker
        });

    }


    const getFilteredData = async () =>{
        const filter:FilterCriteria[]=[{
            field:contentData?.searchPicker?.searchOptionValue,
            operator:'LIKE',
            value:contentData?.searchPicker?.searchText
        }]
        const filterdData= await BackendPost(`${ENDPOINTS.CONTENT.GET}`,{filter});
        if(filterdData.success){
            const data=filterdData['responseData']['message']
            handleState({ contentModalData:data })
        }
        else{
            handleState({ contentModalData:data  })
        }
    }

    const getFilteredFromDateData = async ()=>{
        const filter:FilterCriteria[]=[{
            field:contentData?.datePicker?.calenderColumn,
            operator:'BETWEEN',
            value:{startDate:contentData?.datePicker?.calendarStartDate,endDate:contentData?.datePicker?.calendarEndDate}
        }]
        const filterdData= await BackendPost(`${ENDPOINTS.CONTENT.GET}`,{filter});
        if(filterdData.success){
            const data=filterdData['responseData']['message']
            handleState({ contentModalData:data })
        }
        else{
            handleState({ contentModalData:data  })
        }

    }


    useSearchFilter(getFilteredData,contentData['searchPicker']);
    useDateFilter(getFilteredFromDateData,contentData['datePicker']);

    const handleClear =()=>{
        handleState({ contentModalData:data  })
    }

    return (
        <Fragment>
            {loading ?
                <PrCircularProgressIndicator />
                :
                <div className="p-4">
                    <div className="h-[4rem] flex">
                        <H1>{LANG.COMMON.CONTENTMANAGEMENT}</H1>
                        <div className="ml-auto flex items-center space-x-4">
                            <DateFilter
                             onDateRangeChange={handleDateRangeChange} 
                            options={contentData?.datePicker?.calenderColumnOptions}
                             value={contentData?.datePicker?.calenderColumn}
                              onChange={(value:string)=>{
                                handleState({
                                    datePicker:{
                                        ...contentData?.datePicker,
                                        calenderColumn:value
                                    }
                                })
                              }} 
                              onClear={handleClear} 
                            
                            />
                            <PrButton label={'Add'} iconName={'Plus'} onClick={handleModal} iconPosition='right' />
                            <PrSearch 
                            onSearch={(e:any)=>{
                                handleState({
                                    searchPicker:{
                                        ...contentData?.searchPicker,
                                        searchText:e.target.value
                                    }
                                })
                            }} value={contentData?.searchPicker?.searchText}

                                prSelectOption={contentData?.searchPicker?.searchOption}
                                 prSelectValue={contentData?.searchPicker?.searchOptionValue}
                                  prOnChange={(value:string)=>{
                                    handleState({
                                        searchPicker:{
                                            ...contentData?.searchPicker,
                                            searchOptionValue:value
                                        }
                                    })
                                  }} 
                                
                                
                                  onClear={handleClear}               ></PrSearch>
                            <PrPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        </div>
                    </div>

                    <PrTable headers={
                        [
                            {
                                name: 'Content Id',
                                id: 'content_id'
                            }, {
                                name: 'Title',
                                id: 'content_title'
                            }, {
                                name: 'Content',
                                id: 'content'
                            },
                            {
                                name: 'Image',
                                id: 'content_image',
                                renderComponent: ImageCellComponent,
                                renderProps: { dataField: 'content_image' }
                            },
                            {
                                name: 'Action',
                                id: 'action',
                                renderComponent: ActionCellComponent,
                                renderProps: { dataField: 'action' }
                            }
                        ]
                    } data={visibleData}></PrTable>
                    {openModal && <AddContentModal handleModal={handleModal}></AddContentModal>}
                    {openUpdateModal && <UpdateContentModal id={updateContentId} handleModal={updateModalBox} />}
                </div>}
        </Fragment>
    );
}
export default ContentModal;