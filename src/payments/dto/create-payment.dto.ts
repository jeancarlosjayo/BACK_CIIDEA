import { Graduate } from "src/graduate/schema/graduate.schema";
import { Quote } from "src/quotes/schema/quote.schema";
import { User } from "src/users/schema/users.schema";

export class CreatePaymentDto {
    importeTotal: number;
    student: User
    graduate: Graduate
    quote: Quote
}
