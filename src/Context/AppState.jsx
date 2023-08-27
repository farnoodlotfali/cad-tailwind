import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";

const AppState = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppState;
