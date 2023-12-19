import { useLocation } from "react-router-dom";

export function useSearchParams() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  return {
    searchParams,
  };
}
