import { useNavigate, useLocation } from "react-router-dom";

export function useSearchParams() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const setSearchParams = (newSearchParams) => {
    navigate({
      pathname: location.pathname,
      search: `?${newSearchParams.toString()}`,
    });
  };

  return { searchParams, setSearchParams };
}
