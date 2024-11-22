import { IAppointment } from "./Appointment.interface";
import { ICloseDays } from "./CloseDays.interface";
import { ILadenAddress } from "./LadenAddress.interface";
import { IPriceListe } from "./PriceListe.interface";
import { IReviews } from "./Reviews.interface";
import { IWeekdays } from "./Weekdays.interface";
export interface ILaden {
    barber_email: string;
    Laden_name: string;
    Laden_description: string;
    Laden_IMG: string[];
    reviews: IReviews[];
    start_Abo_Date: string;
    end_Abo_Date: string;
    Laden_adress: ILadenAddress;
    week_days: IWeekdays[];
    reserved_appointments: IAppointment[];
    close_days: ICloseDays[];
    priceListe: IPriceListe[];
}
