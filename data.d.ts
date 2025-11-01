// Global type declarations for data.js

declare global {
    interface Window {
        pJSDom: any[];
        publications: Publication[];
    }

    function particlesJS(tagId: string, params: any): void;
}

export type PublicationStatus = 'published' | 'revising' | 'accepted' | 'finalizing' | 'in-prep';

export interface Publication {
    status: PublicationStatus;
    title: string;
    journal?: string;
    link?: string;
    abstract?: string;
}

export {};