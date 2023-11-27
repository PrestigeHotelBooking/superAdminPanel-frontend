import PrTable from '@/components/common/PrTable/PrTable'
import products from '../../common/booking_data.json'
import DateFilter from '@/components/common/DateFilter/dateFilter'
import { H1 } from '@/components/common/Header/header'
import PrButton from '@/components/common/PrButton/PrButton'
import PrSearch from '@/components/common/PrSearch/PrSearch'
import { LANG } from '@/components/lang/Lang'
import { BookingComponentStatus, CheckInStatusComponent, RoomsSelectedComponent } from './common/bookingComponent'
import { CheckInCellComponent } from '../payment/paymentModal'
import PrPagination from '@/components/common/PrPagination/PrPagination'
import { useFilteredPagination } from '@/components/common/PrPagination/PrPaginationCalculator'
import { TableCellPropsT } from '@/components/common/PrTable/PrTableCommon'
import generateExcelAndDownload from '../../../components/services/ExcelDownloader'
import PrIcon from '@/components/common/PrIcon/PrIcon'
import { Fragment, useEffect, useMemo, useState } from 'react'
import BookingDetailModal from './common/bookingDetailModal'
import { useDebounce } from '@uidotdev/usehooks'
import { CriteriaFilterPayload, FilterCriteria } from '@/components/helper/criteriaFilter'
import PrRowPagination from '@/components/common/PrPagination/PrRowPagination'
import { DateFilterT, SearchFilterT } from '@/modals/common/filter'
import useBookingData from '@/hooks/useBooking/useBooking'
import PrCircularProgressIndicator from '@/components/common/Loader/PrCircularProgressIndicator'

interface BookingModalT {
  datePicker: DateFilterT
  searchPicker: SearchFilterT
}

const initialBookingModalData: BookingModalT = {
  datePicker: {
    calenderColumn: '',
    calendarEndDate: null,
    calendarStartDate: null,
    calenderColumnOptions: [],
  },
  searchPicker: {
    searchOption: [],
    searchOptionValue: '',
    searchText: '',
  },
}

function BookingModal() {
  const [bookingModalData, setBookingModalData] = useState<BookingModalT>(initialBookingModalData)
  const [openModal, setOpenModal] = useState(false)
  const { data, loading } = useBookingData()
  const [bookingId, setBookingId] = useState('')

  const dataMemo = useMemo(() => {
    return data?.map((data: any) => {
      return {
        booking_id: data?.booking_id,
        customer_name: data?.customerDetails?.first_name,
        property_name: data?.propertyDetails?.property_name,
        check_in: data?.check_in,
        check_out: data?.check_out,
        final_amount: data?.total_amount,
        booking_status: data?.booking_status,
        check_in_status: data?.check_in_status,
      }
    })
  }, [data])

  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const { currentPage, visibleData, handlePageChange, totalPages } = useFilteredPagination(dataMemo, '', itemsPerPage)

  const handleModal = (data: string) => {
    setBookingId(data)
    setOpenModal(!openModal)
  }

  const BookingActionComponent: React.FC<TableCellPropsT> = (props) => {
    return (
      <div>
        <PrIcon
          name={'Eye'}
          className='cursor-pointer'
          color='blue'
          onClick={() => handleModal(props.rowData.booking_id)}
        ></PrIcon>
      </div>
    )
  }

  const handleState = (payload: Partial<BookingModalT>) => {
    setBookingModalData((prevState) => ({
      ...prevState,
      ...payload,
    }))
  }

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null): void => {
    handleState({
      datePicker: {
        ...bookingModalData.datePicker,
        calendarStartDate: startDate,
        calendarEndDate: endDate,
      },
    })
  }

  return (
    <div>
      {loading ? (
        <PrCircularProgressIndicator />
      ) : (
        <Fragment>
          <div className='h-[4rem] flex'>
            <H1>{LANG.COMMON.BOOKINGMANAGEMENT}</H1>
            <div className='ml-auto flex items-center space-x-4'>
              <PrSearch
                onSearch={function (e: React.ChangeEvent<HTMLInputElement>): void {
                  throw new Error('Function not implemented.')
                }}
                value={''}
                prSelectOption={[]}
                prSelectValue={''}
                prOnChange={function (value: string): void {
                  throw new Error('Function not implemented.')
                }}
                onClear={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
              <PrButton
                label={'Download'}
                iconName={'Download'}
                buttonStyle='primary'
                onClick={() => generateExcelAndDownload(visibleData, 'booking')}
              ></PrButton>
              <DateFilter
                onDateRangeChange={handleDateRangeChange}
                options={[]}
                value={''}
                onChange={function (value: any): void {
                  throw new Error('Function not implemented.')
                }}
                onClear={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
              <PrRowPagination
                totalRows={totalPages}
                currentPageData={visibleData}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={(itemsPerPage) => {
                  setItemsPerPage(itemsPerPage)
                }}
              />
              <PrPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              ></PrPagination>
            </div>
          </div>
          <PrTable
            headers={[
              {
                id: 'booking_id',
                name: 'Booking Id',
              },
              {
                id: 'customer_name',
                name: 'Customer Name',
              },
              {
                id: 'property_name',
                name: 'Property Name',
              },
              {
                id: 'selectedRoomTypes',
                name: 'Rooms Selected',
                renderComponent: RoomsSelectedComponent,
                renderProps: { dataField: 'selectedRoomTypes' },
                width: 'w-64',
              },
              {
                id: 'check_in',
                name: 'Check In',
                renderComponent: CheckInCellComponent,
                renderProps: { dataField: 'checkIn' },
              },
              {
                id: 'check_out',
                name: 'Check Out',
                renderComponent: CheckInCellComponent,
                renderProps: { dataField: 'checkout' },
              },
              {
                id: 'final_amount',
                name: 'Final Amount',
              },
              {
                id: 'booking_status',
                name: 'Booking Status',
                renderComponent: BookingComponentStatus,
                renderProps: { dataField: 'bookingStatus' },
              },
              {
                id: 'check_in_status',
                name: 'Check-In-Status',
                renderComponent: CheckInStatusComponent,
                renderProps: { dataField: 'checkInStatus' },
              },
              {
                id: 'action',
                name: 'Action',
                renderComponent: BookingActionComponent,
                renderProps: { dataField: 'action' },
              },
            ]}
            data={visibleData}
          ></PrTable>
          {openModal && <BookingDetailModal bookingId={bookingId}></BookingDetailModal>}
        </Fragment>
      )}
    </div>
  )
}
export default BookingModal
