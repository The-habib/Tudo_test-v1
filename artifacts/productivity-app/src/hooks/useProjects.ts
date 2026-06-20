import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";
import { apiFetch } from "@/lib/api";

export type Project = {
  id: string;
  name: string;
  startDate: string | null;
  deadlineDate: string | null;
  totalTasks: number;
  completedTasks: number;
  createdAt: string;
};

export function useProjects() {
  const { getToken } = useAuth();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => apiFetch("/projects", getToken),
  });
}

export function useAddProject() {
  const { getToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; startDate?: string; deadlineDate?: string }) =>
      apiFetch("/projects", getToken, { method: "POST", body: data }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const { getToken } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/projects/${id}`, getToken, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}
