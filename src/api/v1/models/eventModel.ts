export interface EventDetails {
    /** The event's ID */
    id: string;

    /** The name of the event */
    name: string;

    /** A string describing the event */
    description: string;

    /** Day of the event */
    date: Date;
}