import { Session } from 'next-auth';

// Extend the default Session type to include accessToken
declare module 'next-auth' {
    interface Session {
        accessToken?: string;
        roles?: any[];
    }
}