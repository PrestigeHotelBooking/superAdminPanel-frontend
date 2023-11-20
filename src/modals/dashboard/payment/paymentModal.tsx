import React, { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import _, { filter, has } from "lodash";
import DateFilter from "@/components/common/DateFilter/dateFilter";
import DateFormat from "@/components/common/DateFormat/dateFormat";
import { H1 } from "@/components/common/Header/header";
import PrButton from "@/components/common/PrButton/PrButton";
import PrSearch from "@/components/common/PrSearch/PrSearch";
import PrTable, {
  headerComponentProps,
} from "@/components/common/PrTable/PrTable";
import { TableCellPropsT } from "@/components/common/PrTable/PrTableCommon";
import { LANG } from "@/components/lang/Lang";

import {
  PaymentStatusT,
  RefundStatusT,
  generateFilterQueryWithValues,
  getPaymentStatusBackgroundColor,
  getRefundStatusColor,
  initialPaymentModalInputT,
  paymentModalInputT,
  paymentStatusColour,
  refundStatusCommon,
} from "./common/paymentCommon";
import PrPagination from "@/components/common/PrPagination/PrPagination";
import { useFilteredPagination } from "@/components/common/PrPagination/PrPaginationCalculator";
import generateExcelFromJSON from "@/components/services/ExcelDownloader";
import PrRowPagination from "@/components/common/PrPagination/PrRowPagination";
import useBookingData from "@/hooks/useBooking/useBooking";
import { BookingT } from "../booking/common/booking.types";
import PrCircularProgressIndicator from "@/components/common/Loader/PrCircularProgressIndicator";
import {
  useDateFilter,
  useSearchFilter,
} from "@/components/common/DateFilter/useDateFilter";
import { BackendPost } from "@/components/services/BackendServices";
import { ENDPOINTS } from "@/components/lang/EndPoints";
import { FilterCriteria } from "@/components/helper/criteriaFilter";
import PrIcon from "@/components/common/PrIcon/PrIcon";
import PrIconV2 from "@/components/common/PrIcon/PrIconV2";
import { Popper } from "@mui/material";
import PrInputField from "@/components/common/PrInputField/PrInputField";
import { isStringNotEmpty } from "@/components/helper/validator";

export interface dropDownFilterT {
  label: string;
  value: string;
  index: number;
}

type filteHeaderT = "REFUND" | "PAYMENT" | "PROPERTY";

export interface ComissionCellComponentProps {
  data: any;
}
export const ComissionCellComponentColor: React.FC<
  ComissionCellComponentProps
> = ({ data }) => {
  if (data === null) {
    return null; // Render nothing if data is null
  }

  return (
    <div className="flex space-x-2">
      <div className="bg-[#3572F4] text-white p-2 w-[12rem] text-center rounded-full">
        ₹{data?.amount}
      </div>
      <div className="bg-[#48B549] text-white p-2 rounded-full text-center">
        {data?.percentage}%
      </div>
    </div>
  );
};

export const ComissionCellComponent: React.FC<TableCellPropsT> = (data) => {
  return <ComissionCellComponentColor data={data?.data} />;
};

const RefundStatusCellComponent: React.FC<TableCellPropsT> = (data) => {
  const refundStatusData = data?.data as RefundStatusT;

  if (!refundStatusData) {
    return null;
  }

  const statusColor = getRefundStatusColor[refundStatusData];
  const { textColor, backgroundColor, label } = statusColor;

  return (
    <div className="flex">
      <div className={`w-4 h-4 rounded-full ${backgroundColor}`}></div>
      <div className={`ml-2 font-bold ${textColor}`}>{label}</div>
    </div>
  );
};

interface PaymentStatusCellComponentColorProps {
  data: PaymentStatusT;
}

export const PaymentStatusCellComponentColor: React.FC<
  PaymentStatusCellComponentColorProps
> = ({ data }) => {
  const { bgColour, label } = getPaymentStatusBackgroundColor(data);

  return (
    <div className={`${bgColour} rounded-full text-white ml-2 p-2 text-center`}>
      {label}
    </div>
  );
};

const PaymentStatusCellComponent: React.FC<TableCellPropsT> = (data) => {
  return <PaymentStatusCellComponentColor data={data?.data} />;
};

export const CheckInCellComponent: React.FC<TableCellPropsT> = (data) => {
  return (
    <DateFormat
      date={data?.data}
      className="text-black"
      formatType="dd MMM yyyy"
    />
  );
};

const checkOutTimeCellComponent: React.FC<TableCellPropsT> = (data) => {
  return (
    <DateFormat
      date={data?.data}
      className="text-black"
      formatType="dd MMM yyyy"
    />
  );
};

const PaymentModal = () => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [hashAllTheFilter, setHashAllTheFilter] = useState<Record<string, any>>(
    {}
  );

  const { data: bookingData, loading } = useBookingData();

  const [userData, setUserData] = useState<paymentModalInputT>(
    initialPaymentModalInputT
  );

  const deleteHashKey = (keyToDelete: filteHeaderT) => {
    const updatedHash = { ...hashAllTheFilter };
    delete updatedHash[keyToDelete];
    setHashAllTheFilter(updatedHash);
  };

  const getHeaderFilter = async (type: filteHeaderT, data: any) => {

    const valueList = Object.values(data).map((d: any) => {
      return d?.value;
    });


    setHashAllTheFilter({
      ...hashAllTheFilter,
      [type]: valueList,
    });

    const updatedFilter = { ...hashAllTheFilter, [type]: valueList };

    let filter: FilterCriteria[][] = [];
    if (hashAllTheFilter) {
      const keys = Object.keys(updatedFilter);
      const value = Object.values(updatedFilter);
      for (let i = 0; i < keys.length; i++) {
        const typeData = keys[i];
        const valueData = value[i];
        let typeValue = "";
        if (typeData === "REFUND") {
          typeValue = "refund_status";
        } else if (typeData === "PAYMENT") {
          typeValue = "payment_status";
        } else if (typeData === "PROPERTY") {
          typeValue = "property_name";
        }
        filter.push(generateFilterQueryWithValues(typeValue, valueData));
      }
    }

    const groupType = "AND";
    const getTypeFilterData = await BackendPost(`${ENDPOINTS.BOOKING.GET}`, {
      filter,
      groupType,
    });

    if (getTypeFilterData?.success) {
      handleState({ userData: getTypeFilterData["responseData"]?.message });
    } else {
      handleState({ userData: bookingData });
    }
  };


  const RefundHeaderComponent: React.FC<headerComponentProps> = ({ name }) => {
    

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [checkedState, setCheckedState] = useState<{
      [key: number]: { value: string; check: boolean };
    }>({});

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setOpen(!open);
    };

    const handleCheckboxChange = (index: number, value: string) => {
      setCheckedState((prevCheckedState) => ({
        ...prevCheckedState,
        [index]: {
          value: value,
          check: !prevCheckedState[index]?.check,
        },
      }));
    };

    return (
      <div className="flex flex-row cursor-pointer" onClick={handleClick}>
        <div>{name}</div>
        <PrIconV2 name={`ArrowDropDown`} />
        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <div className="mt-3" onClick={(e) => e.stopPropagation()}>
            <div className="w-[20rem] h-[15rem] bg-white rounded-md ">
              <div className="w-full h-3/4 overflow-auto">
                <div className="p-3">
                  {refundStatusCommon?.map((d, index) => {
                    return (
                      <div
                        key={d?.value}
                        className="flex flex-row space-x-2 p-2"
                      >
                        <input
                          type="checkbox"
                          className="rounded-md"
                          checked={checkedState[index]?.check || false}
                          onChange={() => handleCheckboxChange(index, d.value)}
                        />
                        <div className="text-md font-semibold">{d?.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className=" p-4 flex flex-row justify-between items-center">
                <button
                  className="rounded-full p-2 w-20 text-white bg-blue-400"
                  onClick={() => {
                    handleClear();
                    deleteHashKey("REFUND");
                  }}
                >
                  Reset
                </button>
                <button
                  className="rounded-full p-2 w-20 text-white bg-blue-400"
                  onClick={() => {
                    getHeaderFilter("REFUND", checkedState);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </Popper>
      </div>
    );
  };

  const PaymentHeaderComponent: React.FC<headerComponentProps> = ({ name }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [checkedState, setCheckedState] = useState<{
      [key: number]: { value: string; check: boolean };
    }>({});

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setOpen(!open);
    };

    const handleCheckboxChange = (index: number, value: string) => {
      setCheckedState((prevCheckedState) => ({
        ...prevCheckedState,
        [index]: {
          value: value,
          check: !prevCheckedState[index]?.check,
        },
      }));
    };

    return (
      <div className="flex flex-row cursor-pointer" onClick={handleClick}>
        <div>{name}</div>
        <PrIconV2 name={`ArrowDropDown`} />
        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <div className="mt-3" onClick={(e) => e.stopPropagation()}>
            <div className="w-[20rem] h-[13rem] bg-white rounded-md ">
              <div className="w-full h-3/2 overflow-auto">
                <div className="p-3">
                  {paymentStatusColour.map((d, index) => {
                    return (
                      <div
                        key={d?.value}
                        className="flex flex-row space-x-2 p-2"
                      >
                        <input
                          type="checkbox"
                          className="rounded-md"
                          checked={checkedState[index]?.check || false}
                          onChange={() => handleCheckboxChange(index, d.value)}
                        />
                        <div className="text-md font-semibold">{d?.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className=" p-4 flex flex-row justify-between items-center">
                <button
                  className="rounded-full p-2 w-20 text-white bg-blue-400"
                  onClick={() => {
                    handleClear();
                    deleteHashKey("PAYMENT");
                  }}
                >
                  Reset
                </button>
                <button
                  className="rounded-full p-2 w-20 text-white bg-blue-400"
                  onClick={() => {
                    getHeaderFilter("PAYMENT", checkedState);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </Popper>
      </div>
    );
  };

  const HeaderComponent: React.FC<headerComponentProps> = ({ name }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [checkedState, setCheckedState] = useState<{
      [key: number]: { value: string; check: boolean };
    }>({});


    const searchMemo = useDebounce(searchText, 300);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setOpen(!open);
    };

    const handleCheckboxChange = (index: number, value: string) => {
      setCheckedState((prevCheckedState) => ({
        ...prevCheckedState,
        [index]: {
          value: value,
          check: !prevCheckedState[index]?.check,
        },
      }));
    };

    const originalArray = dataMemo?.map((d: any, index: number) => {
      return {
        label: d?.property_name,
        value: d?.property_name,
        index: index,
      };
    });

    const uniqueArray = _.uniqBy(originalArray, "value");

    const headerDataMemo = useMemo(() => {
      if (isStringNotEmpty(searchMemo)) {
        return uniqueArray
          .filter((d: any) =>
            d?.label?.toLowerCase()?.includes(searchMemo?.toLowerCase())
          )
          .map((d: any) => ({
            label: d?.label,
            value: d?.value,
            index: d?.index,
          }));
      }

      return uniqueArray;
    }, [searchMemo, uniqueArray]);

    return (
      <div className="flex flex-row cursor-pointer" onClick={handleClick}>
        <div>{name}</div>
        <PrIconV2 name={`ArrowDropDown`} />
        <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
          <div className="mt-3" onClick={(e) => e.stopPropagation()}>
            <div className="w-[20rem] h-[20rem] bg-white rounded-md ">
              <div className="p-3  flex flex-row space-x-3">
                <PrIcon name={`Search`} color="blue" />
                <PrInputField
                  label={""}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  className="w-full h-10"
                  placeholder="Search..."
                />
              </div>

              <div className="w-full h-2/4 overflow-auto">
                <div className="p-3">
                  {headerDataMemo.map((d: any) => {
                    return (
                      <div
                        key={d.index}
                        className="flex flex-row space-x-4 space-y-1"
                      >
                        <input
                          type="checkbox"
                          className="rounded-md"
                          checked={checkedState[d.index]?.check || false}
                          onChange={() =>
                            handleCheckboxChange(d.index, d.value)
                          }
                        />

                        <div className="font-bold text-lg">{d?.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className=" p-4 flex flex-row justify-between items-center">
                <button
                  className="rounded-full p-2 w-20 text-white bg-blue-400"
                  onClick={() => {
                    handleClear();
                    deleteHashKey("PROPERTY");
                  }}
                >
                  Reset
                </button>
                <button
                  className="rounded-full p-2 w-20 text-white bg-blue-400"
                  onClick={() => {
                    getHeaderFilter("PROPERTY", checkedState);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </Popper>
      </div>
    );
  };

  useEffect(() => {
    if (!loading) {
      handleState({ userData: bookingData });
    }
  }, [bookingData, loading]);

  const handleState = (data: Partial<paymentModalInputT>) => {
    setUserData((prevState) => ({
      ...prevState,
      ...data,
    }));
  };

  const dataMemo = useMemo(() => {
    return userData?.userData?.map((d: BookingT) => {
      return {
        booking_id: d?.booking_id,
        customer_name: d?.customerDetails?.first_name,
        property_name: d?.propertyDetails?.property_name,
        check_in: d?.check_in,
        check_out: d?.check_out,
        final_amount: d?.total_amount,
        tax_amount: 10,
        commission: d?.convenience_charge,
        payment_status: d?.payment_status,
        refund_status: d?.refund_status,
      };
    });
  }, [userData.userData]);

  const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    handleState({
      datePicker: {
        ...userData.datePicker,
        calendarStartDate: startDate,
        calendarEndDate: endDate,
      },
    });
  };

  const getFilteredData = async () => {
    const filter: FilterCriteria[] = [
      {
        field: userData["datePicker"].calenderColumn,
        operator: "BETWEEN",
        value: {
          startDate: userData?.datePicker?.calendarStartDate,
          endDate: userData?.datePicker?.calendarEndDate,
        },
      },
    ];
    const data = await BackendPost(`${ENDPOINTS.BOOKING.GET}`, { filter });
    if (data.success) {
      handleState({ userData: data["responseData"]["message"] });
    } else {
      handleState({ userData: bookingData });
    }
  };

  const getSearchFilterData = async () => {
    const filter: FilterCriteria[] = [
      {
        field: userData["searchPicker"]?.searchOptionValue,
        operator: "LIKE",
        value: userData["searchPicker"]?.searchText,
      },
    ];
    const data = await BackendPost(`${ENDPOINTS.BOOKING.GET}`, { filter });
    if (data.success) {
      handleState({ userData: data["responseData"]["message"] });
    } else {
      handleState({ userData: bookingData });
    }
  };

  const handleClear = () => {
    handleState({ userData: bookingData });
  };

  useDateFilter(getFilteredData, userData["datePicker"]);
  useSearchFilter(getSearchFilterData, userData["searchPicker"]);

  const { visibleData, totalPages, currentPage, handlePageChange } =
    useFilteredPagination(dataMemo, "", itemsPerPage);

  return (
    <div className="p-3 ">
      <div className="h-[4rem] flex">
        <H1>{LANG.COMMON.PAYMENTMANAGEMENT}</H1>
        <div className="ml-auto flex items-center space-x-4">
          <DateFilter
            onDateRangeChange={handleDateRangeChange}
            options={userData?.datePicker?.calenderColumnOptions}
            value={userData?.datePicker?.calenderColumn}
            onChange={(value: string) => {
              handleState({
                datePicker: {
                  ...userData.datePicker,
                  calenderColumn: value,
                },
              });
            }}
            onClear={handleClear}
          />

          <PrButton
            label={"Excel"}
            iconName={"Download"}
            onClick={() => generateExcelFromJSON(visibleData, "paymentData")}
          />
          <PrSearch
            value={userData["searchPicker"]?.searchText}
            onSearch={(e) =>
              handleState({
                searchPicker: {
                  ...userData.searchPicker,
                  searchText: e.target.value,
                },
              })
            }
            prSelectOption={userData?.searchPicker?.searchOption}
            prSelectValue={userData?.searchPicker?.searchOptionValue}
            prOnChange={(value: string) => {
              handleState({
                searchPicker: {
                  ...userData.searchPicker,
                  searchOptionValue: value,
                },
              });
            }}
            onClear={handleClear}
          ></PrSearch>
          <PrRowPagination
            totalRows={totalPages}
            currentPageData={visibleData}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={(itemsPerPage) => {
              setItemsPerPage(itemsPerPage);
              handlePageChange(1);
            }}
          />
          <PrPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      <div className="h-full mb-2">
        {loading && dataMemo ? (
          <PrCircularProgressIndicator />
        ) : (
          <PrTable
            headers={[
              {
                id: "index",
                name: "#",
                width: "1rem",
              },
              {
                name: "Booking Id",
                id: "booking_id",
              },
              {
                name: "Customer Name",
                id: "customer_name",
              },
              {
                name: "Property Name",
                id: "property_name",
                renderHeaderComponent: HeaderComponent,
              },
              {
                name: "Check In",
                id: "check_in",
                renderComponent: CheckInCellComponent,
                renderProps: { dataField: "check_in" },
              },
              {
                name: "Check Out",
                id: "check_out",
                renderComponent: checkOutTimeCellComponent,
                renderProps: { dataField: "check_out" },
              },
              {
                name: "Final Amount",
                id: "final_amount",
              },
              {
                name: "Tax Amount",
                id: "tax_amount",
              },
              {
                name: "Commission",
                id: "commission",
                renderComponent: ComissionCellComponent,
                renderProps: { dataField: "commission" },
              },
              {
                name: "Payment Status",
                id: "payment_status",
                renderComponent: PaymentStatusCellComponent,
                renderHeaderComponent: PaymentHeaderComponent,
                renderProps: { dataField: "payment_status" },
              },
              {
                name: "Refund Status",
                id: "refund_status",
                renderComponent: RefundStatusCellComponent,
                renderHeaderComponent: RefundHeaderComponent,
                renderProps: { dataField: "refund_status" },
              },
            ]}
            data={visibleData}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
