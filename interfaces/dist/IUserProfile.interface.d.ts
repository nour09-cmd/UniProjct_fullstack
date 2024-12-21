import { IAppointment } from "./Appointment.interface";
export interface IUserProfile {
    user_email: string;
    Appointments: IAppointment[];
}
