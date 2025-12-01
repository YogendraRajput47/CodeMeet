import { useState, useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";

export function useGetToken() {
  const clerk = useClerk();
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function fetchToken() {
      const t = await clerk.session?.getToken();
      setToken(t);
    }
    fetchToken();
  }, [clerk]);

  return token; // null first → valid token afterwards
}
