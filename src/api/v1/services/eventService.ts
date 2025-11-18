import * as firestoreRepository from "../repositories/firestoreRepository";
import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";

import { EventDetails } from "../models/eventModel";

export const storeEventDetails = async (
    details: Omit<EventDetails, "id">,
): Promise<EventDetails> => {
    try {
        const newEvent: Partial<EventDetails> = {
            name: details.name,
            description: details.description,
            date: details.date
        };

        const id: string = 
        await firestoreRepository.createDocument<EventDetails>("events", newEvent);

        return structuredClone({ id: id, ...newEvent } as EventDetails);
    } catch (error: unknown) {
        throw error;
    }
};

export const getEventDetailsById = async (
    id: string
): Promise<EventDetails> => {
    try {
        const doc: DocumentSnapshot | null = await firestoreRepository.getDocumentById("events", id);

        if (!doc) {
            throw new Error(`Couldn't find Event with ID:${id}`);
        }

        const data: DocumentData | undefined = doc.data();
        const Event: EventDetails = {
            id: doc.id,
            ...data,
        } as EventDetails;

        return Event;
    } catch (error: unknown) {
        throw error;
    }
};

export const getAllEventDetails = async (): Promise<EventDetails[]> => {
        try {
        const snapshot: QuerySnapshot = await firestoreRepository.getDocuments("events");
        const events: EventDetails[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as EventDetails;
        });

        return events;
    } catch (error: unknown) {
        throw error;
    }
};

export const updateEventDetails = async (
    id: string,
    eventData: Pick<EventDetails, "name" | "description">
): Promise<EventDetails> => {
    try {
        const event: EventDetails = await getEventDetailsById(id);

        if (!event) {
            throw new Error(`Event with ID ${id} not found`);
        }

        const updatedEvent: Omit<EventDetails, "id"> = {
            ...event,
            ...eventData
        };

        await firestoreRepository.updateDocument<EventDetails>(
            "events",
            id,
            updatedEvent
        );

        return structuredClone(
            { id: id, ...updatedEvent } as EventDetails
        );
    } catch (error: unknown) {
        throw error;
    }
};

export const deleteEventDetails = async (
    id: string
): Promise<void> => {
    try {
        const event: EventDetails = await getEventDetailsById(id);
        
        if (!event) {
            throw new Error(`Couldn't find Event with ID:${id}`);
        }

        await firestoreRepository.deleteDocument("events", id);
    } catch (error: unknown) {
        throw error;
    }
};
