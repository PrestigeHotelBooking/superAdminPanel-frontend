import React from 'react';
import Image from 'next/image';
import Nodata from '../../../assets/common/nodatafound.svg';
import NoDataFound from '../NoDataFound/NoDataFound';
interface TableCellProps {
    data: any;
    renderComponent?: React.FC<{ data: any; dataField: string; rowIndex: number; rowData: any }>;
    renderProps?: any;
}

interface PrTableProps {
    headers: {
        id: string;
        name: string;
        renderComponent?: React.FC<any>;
        renderProps?: any;
        width?: string;
    }[];
    data: any[];
}

const TableCell: React.FC<TableCellProps> = ({ data, renderComponent: Component, renderProps }) => {
    if (renderProps?.dataField === 'index') {
        return <td className="px-6 py-4 text-black font-semibold">{renderProps.rowIndex + 1}</td>;
    }

    if (Component) {
        return (
            <td className="px-6 py-4">
                <Component data={data} dataField={renderProps?.dataField} rowIndex={renderProps?.rowIndex} rowData={renderProps?.rowData} />
            </td>
        );
    }

    return <td className="px-6 py-4 text-black font-semibold">{data}</td>;
};

const PrTable: React.FC<PrTableProps> = ({ headers, data }) => {
    return (
        <div className="flex flex-col w-full shadow-md rounded-lg bg-blue-600">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-black dark:text-gray-100 table-fixed">
                    <colgroup>
                        <col className="w-8" /> {/* Set width of index column */}
                        {headers.slice(1).map((header, index) => (
                            <col key={index} className={header.width || `w-${100 / headers.length}`} />
                        ))}
                    </colgroup>
                    <thead className="text-md h-16 bg-blue-300 dark:bg-gray-700 dark:text-gray-200 sticky top-0">
                        <tr>
                            {headers.map((header, index) => (
                                <th
                                    key={header.id}
                                    scope="col"
                                    className={`px-6 py-3 text-left ${header.id === 'index' ? 'w-8' : ''}`}
                                >
                                    {header.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* ... */}
                </table>
            </div>
            <div className="overflow-auto max-h-[35rem]">
                {data.length === 0 ? (
                    <table className='w-full h-full bg-white'>
                      <NoDataFound></NoDataFound>
                    </table>
                ) : (
                    <table className="w-full text-sm text-left text-black dark:text-gray-100 table-fixed">
                        <colgroup>
                            <col className="w-8" /> {/* Set width of index column */}
                            {headers.slice(1).map((header, index) => (
                                <col key={index} className={header.width || `w-${100 / headers.length}`} />
                            ))}
                        </colgroup>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="bg-white border-b-2 hover:bg-[#fffcf0] border-gray-200 dark:border-gray-600"
                                >
                                    {headers.map((header) => (
                                        <TableCell
                                            key={header.id}
                                            data={row[header.id]}
                                            renderComponent={header.renderComponent}
                                            renderProps={{
                                                dataField: header.id,
                                                rowIndex,
                                                rowData: row,
                                            }}
                                        />
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default PrTable;


