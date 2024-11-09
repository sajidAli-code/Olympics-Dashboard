"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [countryName, setCountryName] = useState('United States')
    const [selectedDisciplineNames, setSelectedDisciplineNames] = useState([]);

    const toggleModel = () => document.getElementById('disciplineModel').showModal();

    return (
        <AppContext.Provider
            value={
                {
                    countryName,
                    setCountryName,
                    toggleModel,
                    selectedDisciplineNames,
                    setSelectedDisciplineNames
                }
            }
        >
            {children}
        </AppContext.Provider>
    );
};

// Custom hook for using context in components
export const useAppContext = () => {
    return useContext(AppContext);
};