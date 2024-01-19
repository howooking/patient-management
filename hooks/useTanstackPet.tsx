import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useTanstackPets(hospitalId: string) {
  const queryClient = useQueryClient();

  const supabase = createSupabaseBrowserClient();
  const getPets = async () => {
    const { data: pets, error: petsError } = await supabase
      .from("pets")
      .select("*")
      .match({ hos_id: hospitalId })
      .order("created_at", { ascending: false });
    return { pets, petsError };
  };

  const { data, error, isFetching, isLoading, refetch } = useQuery({
    queryKey: ["pets", hospitalId],
    queryFn: getPets,
  });

  // Mutations
  // const mutation = useMutation({
  //   mutationFn: postTodo,
  //   onSuccess: () => {
  //     // Invalidate and refetch
  //     queryClient.invalidateQueries({ queryKey: ['todos'] })
  //   },
  // })
  return { data, error, isLoading, isFetching, refetch };
}
