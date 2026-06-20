import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { apiFetch } from "@/lib/api";

export type Habit = {
  id: string;
  title: string;
  icon: string;
  streakDays: number;
  doneToday: boolean;
  createdAt: string;
};

export function useHabits() {
  const { getToken } = useAuth();
  return useQuery<Habit[]>({
    queryKey: ["habits"],
    queryFn: () => apiFetch("/habits", getToken),
  });
}

export function useAddHabit() {
  const { getToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; icon: string }) =>
      apiFetch("/habits", getToken, { method: "POST", body: data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["habits"] }),
  });
}

export function useToggleHabit() {
  const { getToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/habits/${id}/toggle`, getToken, { method: "PATCH" }),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["habits"] });
      const prev = qc.getQueryData<Habit[]>(["habits"]);
      qc.setQueryData<Habit[]>(["habits"], (old) =>
        old?.map((h) =>
          h.id === id
            ? { ...h, doneToday: !h.doneToday, streakDays: h.doneToday ? h.streakDays - 1 : h.streakDays + 1 }
            : h
        )
      );
      return { prev };
    },
    onError: (_err, _id, ctx: any) => qc.setQueryData(["habits"], ctx?.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: ["habits"] }),
  });
}

export function useDeleteHabit() {
  const { getToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/habits/${id}`, getToken, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["habits"] }),
  });
}
