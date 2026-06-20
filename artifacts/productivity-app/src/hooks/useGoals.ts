import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { apiFetch } from "@/lib/api";

export type Goal = {
  id: string;
  title: string;
  icon: string;
  completed: boolean;
  abandoned: boolean;
  createdAt: string;
};

export function useGoals() {
  const { getToken } = useAuth();
  return useQuery<Goal[]>({
    queryKey: ["goals"],
    queryFn: () => apiFetch("/goals", getToken),
  });
}

export function useAddGoal() {
  const { getToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; icon: string }) =>
      apiFetch("/goals", getToken, { method: "POST", body: data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
}

export function useToggleGoal() {
  const { getToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/goals/${id}/toggle`, getToken, { method: "PATCH" }),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["goals"] });
      const prev = qc.getQueryData<Goal[]>(["goals"]);
      qc.setQueryData<Goal[]>(["goals"], (old) =>
        old?.map((g) => (g.id === id ? { ...g, completed: !g.completed, abandoned: false } : g))
      );
      return { prev };
    },
    onError: (_err, _id, ctx: any) => qc.setQueryData(["goals"], ctx?.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
}

export function useAbandonGoal() {
  const { getToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/goals/${id}/abandon`, getToken, { method: "PATCH" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
}

export function useDeleteGoal() {
  const { getToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/goals/${id}`, getToken, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });
}
