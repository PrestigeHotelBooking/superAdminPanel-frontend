import * as XLSX from 'xlsx';

type AnyObject = Record<string, any>;

export default function generateExcelAndDownload(data: AnyObject[], filename: string): void {
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const excelFileContent: Blob = new Blob([XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })]);

  // Automatically initiate download
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(excelFileContent);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0].replace(/-/g, '_');
  const currentTimestamp = currentDate.getTime();
  const fullFilename = `${formattedDate}_${currentTimestamp}`;
  downloadLink.download = `${filename}${fullFilename}.xlsx`;
  downloadLink.style.display = 'none';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
