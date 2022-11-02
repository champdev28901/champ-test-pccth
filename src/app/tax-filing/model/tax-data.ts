export interface taxData {
    filingType?: string;
    month?: string;
    year?: string;
    saleAmount?: number;
    taxAmount?: number;
    surcharge?: number;
    penalty?: number;
    totalAmount?: number;
  }


export interface Date {
    month?: string | any;
    year?: string;
  }

export interface Tax {
    saleAmount?: number;
    taxAmount?: number;
    surcharge?: number;
    penalty?: number;
    totalAmount?: number;
  }
  

