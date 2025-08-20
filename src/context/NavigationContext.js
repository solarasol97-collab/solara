import { createContext, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const router = useRouter();
  const navigationHistory = useRef([]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      navigationHistory.current.push(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router]);

  return (
    <NavigationContext.Provider value={navigationHistory.current}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);
