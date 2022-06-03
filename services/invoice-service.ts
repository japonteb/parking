import { ParkingSpace } from "./parking-service";
import { kyBase } from "./api-base";

// Types //

export interface Invoice {
  id: number;
  parkingSpace: ParkingSpace;
  licensePlate: string;
  cylinderCapacity?: number;
  entryDatetime?: Date;
  exitDatetime?: Date;
  price?: number;
  open: boolean;
}

const invoiceURL = "invoice";

export const registerInvoiceVehicleEntry = (invoice: Invoice): Invoice => {
  invoice.id = Math.floor(Math.random() * 1000);
  invoice.entryDatetime = new Date();
  invoice.open = true;
  kyBase.post(invoiceURL, { json: invoice });
  return invoice;
};

export const registerVehicleExitFromParkingSpace = (
  invoice: Invoice
): Promise<Invoice> => {
  invoice.open = false;
  return kyBase
    .put(`${invoiceURL}/${invoice.id}`, {
      json: { ...invoice },
    })
    .json();
};

export const calculateParkingPrice = (invoice: Invoice): Invoice => {
  invoice.exitDatetime = new Date();
  invoice.price = 500;
  return invoice;
};

export const getInvoiceByParkingLocationService = (
  parkingLocation: string
): Promise<Invoice[]> => {
  return kyBase(
    `${invoiceURL}?parkingSpace.location=${parkingLocation}&open=true`
  ).json();
};

export const getInvoiceByLicensePlateService = (
  licensePlate: string
): Promise<Invoice[]> => {
  return kyBase(`${invoiceURL}?licensePlate=${licensePlate}&open=true`).json();
};
