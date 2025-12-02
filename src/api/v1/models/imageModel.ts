export interface ImageDetails {
    /** The Image's ID */
    id: string;

    /** The route to the image's location */
    route: string;

    /** The image's local filename */
    fileName: string;

    /** The image's title */
    title: string;

    /** A string describing the image */
    description: string;

    /** ID of the event the image is related to */
    eventId: string;
}