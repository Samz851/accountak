import { Dayjs } from "dayjs";

export interface ICompany {
    id: number;
    company_name: string;
    address: string;
    currency: string;
    contact_information?: string;
    contacts?: IContact[];
    accounts?: IAccount[];
}

export interface IAccountType {
    id: number;
    name: string;
    description: string;
    parent_type?: IAccountType;
    child_types?: IAccountType[];
    parent_account_type?: number;
    accounts: IAccount[];
}

export interface IAccount {
    id: number;
    account_name: string;
    account_type: IAccountType;
    parent_account?: IAccount;
    child_accounts: IAccount[] | [];
}

export interface ITransaction {
    id: number;
    date: string;
    description: string;
    amount: number;
    debit_account: IAccount;
    credit_account: IAccount;
    notes_pr?: IInvoice | IBill;
    tax: ITax;
}

export interface ITransactionFilterVariables {
    q: string;
    debit_account: IAccount;
    credit_account: IAccount;
}
export interface IInvoice {
    id: number;
    issue_date: string;
    due_date: string;
    total_amount: number;
    customer: IContact;
}

export interface IBill {
    id: number;
    date: string;
    total_amount: number;
    vendor: IContact;
}

export interface ITax {
    id: number;
    name: string;
    rate: number;
    total?: number;
}

export interface IContact {
    id: number;
    email: string;
    phone_number: string;
    type: string;
    company_id?: number;
    company: ICompany;
    name: string;
    accounts: IAccount[]
}

export interface ITaxFilterVariables {
    q: string;
    name: string;
}

export interface IAccountFilterVariables {
    q: string;
    account_name: string;
    account_type: IAccountType;
}

export interface IOrderChart {
    count: number;
    status:
        | "waiting"
        | "ready"
        | "on the way"
        | "delivered"
        | "could not be delivered";
}

export interface IOrderTotalCount {
    total: number;
    totalDelivered: number;
}

export interface ISalesChart {
    date: string;
    title?: "Order Count" | "Order Amount";
    value: number;
}

export interface IOrderStatus {
    id: number;
    text: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    gender: string;
    gsm: string;
    createdAt: string;
    isActive: boolean;
    avatar: IFile[];
    addresses: IAddress[];
}

export interface IIdentity {
    id: number;
    name: string;
    avatar: string;
}

export interface IAddress {
    text: string;
    coordinate: [number, number];
}

export interface IFile {
    name: string;
    percent: number;
    size: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
    type: string;
    uid: string;
    url: string;
}

export interface IEvent {
    date: string;
    status: string;
}

export interface IStore {
    id: number;
    title: string;
    isActive: boolean;
    createdAt: string;
    gsm: string;
    email: string;
    address: IAddress;
    products: IProduct[];
}

export interface ICourierStatus {
    id: number;
    text: "Available" | "Offline" | "On delivery";
}

export interface ICourier {
    id: number;
    name: string;
    surname: string;
    email: string;
    gender: string;
    gsm: string;
    createdAt: string;
    accountNumber: string;
    licensePlate: string;
    address: string;
    avatar: IFile[];
    store: IStore;
    status: ICourierStatus;
    vehicle: IVehicle;
}

export interface IOrder {
    id: number;
    user: IUser;
    createdAt: string;
    products: IProduct[];
    status: IOrderStatus;
    adress: IAddress;
    store: IStore;
    courier: ICourier;
    events: IEvent[];
    orderNumber: number;
    amount: number;
}

export interface IProduct {
    id: number;
    name: string;
    isActive: boolean;
    description: string;
    images: (IFile & { thumbnailUrl?: string })[];
    createdAt: string;
    price: number;
    category: {
        id: number;
    };
    stock: number;
}

export interface ICategory {
    id: number;
    title: string;
    isActive: boolean;
}

export interface IOrderFilterVariables {
    q?: string;
    store?: string;
    user?: string;
    createdAt?: [Dayjs, Dayjs];
    status?: string;
}

export interface IUserFilterVariables {
    q: string;
    status: boolean;
    createdAt: [Dayjs, Dayjs];
    gender: string;
    isActive: boolean;
}

export interface IReview {
    id: number;
    order: IOrder;
    user: IUser;
    star: number;
    createDate: string;
    status: "pending" | "approved" | "rejected";
    comment: string[];
}

export type IVehicle = {
    model: string;
    vehicleType: string;
    engineSize: number;
    color: string;
    year: number;
    id: number;
};

export interface ITrendingProducts {
    id: number;
    product: IProduct;
    orderCount: number;
}
