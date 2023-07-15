export class CreateQuoteDto {
    codOperacion: string;
    numCuota: number;
    metodoPago:string;
    fecVencCuota: string;
    fecPagoCuota: string;
    importeCuota: number;
    status: string;
    voucher: {
        public_id: string;
        secure_url: string;
        };
}
