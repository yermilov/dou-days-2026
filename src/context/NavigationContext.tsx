import { createContext, useContext } from 'react';

interface NavigationContextValue {
  goToSlideById: (id: string) => void;
}

export const NavigationContext = createContext<NavigationContextValue>({
  goToSlideById: () => {},
});

export const useNavigation = () => useContext(NavigationContext);
