import { Dispatch, SetStateAction } from "react";

interface APIData {
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
}

interface APIDataContextType {
    apiData: APIData | null;
    setAPIData: Dispatch<SetStateAction<APIData | null>>;
}

export type { APIData, APIDataContextType };
