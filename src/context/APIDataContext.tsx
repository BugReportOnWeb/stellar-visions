import { ReactNode, createContext, useState } from "react";
import { APIData, APIDataContextType } from "../types/API";

interface Props {
    children: ReactNode;
}

const APIDataContext = createContext<APIDataContextType | null>(null);

const APIDataContexProvider = ({ children }: Props) => {
    const [apiData, setAPIData] = useState<APIData | null>(null);

    return (
        <APIDataContext.Provider value={{ apiData, setAPIData }}>
            {children}
        </APIDataContext.Provider>
    )
}

export { APIDataContext, APIDataContexProvider };
