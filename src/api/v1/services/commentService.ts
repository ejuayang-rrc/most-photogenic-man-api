import * as firestoreRepository from "../repositories/firestoreRepository";
import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";

import { CommentDetails } from "../models/commentModel";

export const saveComment = async (
    details: Omit<CommentDetails, "id">
): Promise<CommentDetails> => {
    try {
        const newComment: Partial<CommentDetails> = {
            username: details.username,
            comment: details.comment,
            imageId: details.imageId
        };

        const id: string = 
        await firestoreRepository.createDocument<CommentDetails>("comments", newComment);

        return structuredClone({ id: id, ...newComment } as CommentDetails);
    } catch (error: unknown) {
        throw error;
    }
};

export const deleteComment = async (
    id: string
): Promise<void> => {
    try {
        const doc: DocumentSnapshot | null = await firestoreRepository.getDocumentById("comments", id);

        if (!doc) {
            throw new Error(`Couldn't find comment with ID:${id}`);
        }

        const data: DocumentData | undefined = doc.data();
        const comment: CommentDetails = {
            id: doc.id,
            ...data,
        } as CommentDetails;
        
        if (!comment) {
            throw new Error(`Couldn't find comment with ID:${id}`);
        }

        await firestoreRepository.deleteDocument("comments", id);
    } catch (error: unknown) {
        throw error;
    }
};

export const getImageComments = async (
    imageId: string
): Promise<CommentDetails[]> => {
    try {
        const snapshot: QuerySnapshot = await firestoreRepository.getDocuments("comments");
        const comments: CommentDetails[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return { ...data } as CommentDetails;
        });

        const filteredComments: CommentDetails[] = [];

        for (const index in comments) {
            if (imageId === comments[index].imageId.toString()) {
                filteredComments.push(comments[index]);
            }
        }

        return filteredComments;
    } catch (error: unknown) {
        throw error;
    }
};
