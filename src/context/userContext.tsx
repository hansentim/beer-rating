'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    console.log('Server-rendered userName (before hydration):', userName); // Log before hydration
    if (storedName) {
      setUserName(storedName);
    }
    setIsHydrated(true);
    console.log('Client-rendered userName (after hydration):', storedName); // Log after hydration
  }, []);

  if (!isHydrated) {
    return null;
  }

  const updateUserName = (name: string) => {
    setUserName(name);
    localStorage.setItem('userName', name);
    console.log('UserName updated in localStorage:', name);
  };

  return (
    <UserContext.Provider value={{ userName, setUserName: updateUserName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
