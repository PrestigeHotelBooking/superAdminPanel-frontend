import Error from 'next/error';

interface GlobalModal {}
interface GlobalError extends Error {}
export interface GlobalUploadfileModalI {
  urls: string[];
  type: 'IMAGE' | 'FILE' | '';
  open: boolean;
  downloadModal?: boolean;
  metaData?: { getUpdatedUrls?: (urls: string[], metaData?: Record<string, any>) => void; [key: string]: any; singleFile?: boolean };
  formatsAllowed?: 'IMAGE' | 'EXCEL' | 'ALL' | '';
}

export declare interface GlobalReducerI {
  modal?: GlobalModal;
  loading?: boolean;
  help?: boolean;

  error?: GlobalError;
  fileModal: GlobalUploadfileModalI;
  imageSliderModal: {
    imageUrls: string[];
  };
}
