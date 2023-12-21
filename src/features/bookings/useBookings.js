import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
// import { useSearchParams } from "../cabins/useSearchParams";

export function useBookings() {
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //Sort

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [sortField, sortDirection] = sortByRaw.split("-");
  const sortBy = { field: sortField, direction: sortDirection };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });
  return { isLoading, error, bookings };
}
