type ITicketInfo = {
    dateEnd: number;
    dateStart: number;
    destination: string;
    duration: number;
    origin: string;
    stops: string[];
}
interface ITicket {
    companyId: string;
    id: string;
    info: ITicketInfo;
    price: string;
}
interface ICompany {
    id: string;
    logo: string;
    name: string;
}