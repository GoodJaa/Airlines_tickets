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
enum EPriorityFilters {
    Optimal = 3,
    Quick = 2,
    Cheap = 1
}
enum ECityCOdes {
    MOW,
    HKT,
    HKG,
    JNB,
    PTB,
    ARH,
    TRN,
    KRS,
    SRT,
    LOS,
    EKV,
    EKT
}