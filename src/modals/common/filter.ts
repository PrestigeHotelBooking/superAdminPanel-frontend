import { OptionT } from "@/components/common/PrSelect/PrSelect";

export type DateFilterT={
calendarStartDate: Date | null;
calendarEndDate: Date | null;
calenderColumn:string;
calenderColumnOptions:OptionT[];
}

export type SearchFilterT={
    searchText:string;
    searchOption:OptionT[];
    searchOptionValue:string;
}