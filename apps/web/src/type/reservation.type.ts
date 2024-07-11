export interface Reservation {
    status: string;
    startDate: Date;
    endDate: Date;
    userId: number;
    propertyId: number;
    roomId: number;
    price: number;
    type: string;
    id: number;
    room: {
        type: string;
        property: {name: string};
    }
}