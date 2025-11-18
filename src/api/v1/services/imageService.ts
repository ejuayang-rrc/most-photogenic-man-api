import fs from 'fs';

import * as firestoreRepository from "../repositories/firestoreRepository";
import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { ImageDetails } from "../models/imageModel";

export const storeImageDetails = async (
    details: Omit<ImageDetails, "id">,
): Promise<ImageDetails> => {
    try {
        const newImage: Partial<ImageDetails> = {
            route: details.route,
            title: details.title,
            description: details.description,
            eventId: details.eventId
        };

        const id: string = 
        await firestoreRepository.createDocument<ImageDetails>("images", newImage);

        return structuredClone({ id: id, ...newImage } as ImageDetails);
    } catch (error: unknown) {
        throw error;
    }
};

export const getImageDetailsById = async (
    id: string
): Promise<ImageDetails> => {
    try {
        const doc: DocumentSnapshot | null = await firestoreRepository.getDocumentById("images", id);

        if (!doc) {
            throw new Error(`Couldn't find image with ID:${id}`);
        }

        const data: DocumentData | undefined = doc.data();
        const image: ImageDetails = {
            id: doc.id,
            ...data,
        } as ImageDetails;

        return image;
    } catch (error: unknown) {
        throw error;
    }
};

export const getAllImageDetails = async (): Promise<ImageDetails[]> => {
        try {
        const snapshot: QuerySnapshot = await firestoreRepository.getDocuments("images");
        const images: ImageDetails[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as ImageDetails;
        });

        return images;
    } catch (error: unknown) {
        throw error;
    }
};

export const updateImageDetails = async (
    id: string,
    imageData: Pick<ImageDetails, "title" | "description">
): Promise<ImageDetails> => {
    try {
        const image: ImageDetails = await getImageDetailsById(id);

        if (!image) {
            throw new Error(`Image with ID ${id} not found`);
        }

        const updatedImage: Omit<ImageDetails, "id"> = {
            ...image,
            ...imageData
        };

        await firestoreRepository.updateDocument<ImageDetails>(
            "images",
            id,
            updatedImage
        );

        return structuredClone(
            { id: id, ...updatedImage } as ImageDetails
        );
    } catch (error: unknown) {
        throw error;
    }
};

export const deleteImageDetails = async (
    id: string
): Promise<void> => {
    try {
        const image: ImageDetails = await getImageDetailsById(id);

        // Deletes image in local directory
        fs.unlink(`uploads/${image.fileName}`, (err) => {
            if (err) throw err;
        });

        if (!image) {
            throw new Error(`Couldn't find image with ID:${id}`);
        }

        await firestoreRepository.deleteDocument("images", id);
    } catch (error: unknown) {
        throw error;
    }
};

export const getEventImages = async (
    eventId: string
): Promise<ImageDetails[]> => {
    try {
        const images: ImageDetails[] = await getAllImageDetails();
        const filteredImages: ImageDetails[] = [];

        for (const index in images) {
            if (eventId === images[index].eventId.toString()) {
                filteredImages.push(images[index]);
            }
        }

        if (filteredImages.length === 0) {
            throw new Error(`Event with ID: ${eventId} has no images or doesn't exist`);
        }

        return filteredImages;
    } catch (error: unknown) {
        throw error;
    }
};
