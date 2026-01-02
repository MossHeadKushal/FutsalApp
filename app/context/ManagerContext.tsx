
import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the shape of a Manager
export interface Manager {
    id: string;
    name: string;
    futsal: string;
    location: string;
    status: string;
    role: string;
    email?: string;
    phone?: string;
}

// Define the Context Types
interface ManagerContextType {
    managers: Manager[];
    addManager: (manager: Omit<Manager, 'id' | 'status' | 'role'>) => void;
}

// Create Context
const ManagerContext = createContext<ManagerContextType | undefined>(undefined);

// Initial Dummy Data
const INITIAL_MANAGERS: Manager[] = [
    {
        id: '1',
        name: 'Rajan Mani Poudel',
        futsal: 'Dhanawantari Futsal Areana',
        location: 'Dhanawantari Marg, Kathmandu',
        status: 'Active',
        role: 'Manager',
    },
    {
        id: '2',
        name: 'Shyam Karki',
        futsal: 'Dhanawantari Futsal Areana',
        location: 'Dhanawantari Marg, Kathmandu',
        status: 'Active',
        role: 'Manager',
    },
    {
        id: '3',
        name: 'Hari Dhakal',
        futsal: 'Dhanawantari Futsal Areana',
        location: 'Dhanawantari Marg, Kathmandu',
        status: 'Active',
        role: 'Manager',
    },
];

// Provider Component
export const ManagerProvider = ({ children }: { children: ReactNode }) => {
    const [managers, setManagers] = useState<Manager[]>(INITIAL_MANAGERS);

    const addManager = (newManagerData: Omit<Manager, 'id' | 'status' | 'role'>) => {
        const newManager: Manager = {
            id: Math.random().toString(36).substr(2, 9),
            status: 'Active',
            role: 'Manager',
            ...newManagerData,
        };
        setManagers((prev) => [newManager, ...prev]);
    };

    return (
        <ManagerContext.Provider value={{ managers, addManager }}>
            {children}
        </ManagerContext.Provider>
    );
};

// Custom Hook for usage
export const useManagers = () => {
    const context = useContext(ManagerContext);
    if (!context) {
        throw new Error('useManagers must be used within a ManagerProvider');
    }
    return context;
};
