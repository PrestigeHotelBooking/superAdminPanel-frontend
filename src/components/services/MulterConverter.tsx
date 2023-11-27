import { Buffer } from 'buffer';

interface FileObjectT {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export function ConvertBase64ToFullFileObject(base64Images: string): FileObjectT[] {
  // Split the base64 image string into an array with a single element (the entire string)
  const base64ImageArray = [base64Images];

  return base64ImageArray.map((base64Image, index) => {
    // Extract the file extension (e.g., 'png') from the data URI
    const fileExtension = base64Image.match(/\/(.*?)\;/)?.[1] || 'png';

    // Remove the "data:image/png;base64," prefix to get just the base64-encoded data
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

    // Convert the base64 data to a buffer
    const buffer = Buffer.from(base64Data, 'base64');

    // Create an object with all the values from the interface
    const fileObject: FileObjectT = {
      fieldname: `fieldname_${index}`,
      originalname: `image_${index}.${fileExtension}`,
      encoding: 'base64', // You can modify this as needed
      mimetype: `image/${fileExtension}`,
      buffer,
      size: buffer.length,
    };

    return fileObject;
  });
}
