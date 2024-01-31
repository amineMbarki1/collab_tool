import { useState, useEffect } from "react";

export default function useUrlHash() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange);

    function handleHashChange() {
      setHash(location.hash);
    }

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return hash;
}
