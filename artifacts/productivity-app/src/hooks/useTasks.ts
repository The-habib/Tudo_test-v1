import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { apiFetch } from "@/lib/api";

export type Task = {
  id: string;
  title: string;
  scheduledTime: string | null;
  taskDate: string;
  completed: boolean;
  projectId: string | null;
  createdAt: string;
};

export function useTasks() {
  const { getToken } = useAuth();
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: () => apiFetch("/tasks", getToken),
  });
}

export function useAddTask() {
  const { getToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; scheduledTime?: string; taskDate?: string; projectId?: string }) =>
      apiFetch("/tasks", getToken, { method: "POST", body: data }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useToggleTask() {
  const { getToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/tasks/${id}/toggle`, getToken, { method: "PATCH" }),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["tasks"] });
      const prev = qc.getQueryData<Task[]>(["tasks"]);
      qc.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
      return { prev };
    },
    onError: (_err, _id, ctx: any) => qc.setQueryData(["tasks"], ctx?.prev),
    onSettled: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });
}

export function useDeleteTask() {
  const { getToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/tasks/${id}`, getToken, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
