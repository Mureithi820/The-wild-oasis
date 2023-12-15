import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries(["getCabins"]);
      // Refetch immediately after mutation
      queryClient.refetchQueries(["getCabins"], { active: true, exact: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
