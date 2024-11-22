import { IAdressUser } from "./AdresseUser.interface";
export interface IUser {
    id: number;
    vorname: string;
    nachname: string;
    image: string;
    email: string;
    password: string;
    handynummer: string;
    geburtsdatum: Date;
    rolle: string;
    verifyToken: string;
    verifyStatus: boolean;
    resetpasswordtoken: string;
    resetPasswordStatus: boolean;
    adresse: IAdressUser;
}
