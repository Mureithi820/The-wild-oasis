import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User account successfully updated");
      queryClient.invalidateQueries(["user"]);
      // Refetch immediately after mutation
      queryClient.refetchQueries(["user"], { active: true, exact: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import { updateCurrentUser } from "../../services/apiAuth";

// export function useUpdateUser() {
//   const queryClient = useQueryClient();

//   const { mutate: updateUser, isLoading: isUpdating } = useMutation({
//     mutationFn: updateCurrentUser,
//     onSuccess: ({ user }) => {
//       toast.success("User account successfully updated");
//       queryClient.setQueryData(["user"], user);
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return { updateUser, isUpdating };
// }
