"use client";

import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  PROGRESS_STORAGE_KEY,
  progressOrder,
  type LessonProgressMap,
  type LessonProgressStatus,
} from "@/lib/progress";

type ProgressContextValue = {
  progress: LessonProgressMap;
  getStatus: (lessonId: number) => LessonProgressStatus | undefined;
  setStatus: (lessonId: number, status: LessonProgressStatus) => void;
  ensureViewed: (lessonId: number) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function parseProgress(raw: string | null): LessonProgressMap {
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as Record<string, LessonProgressStatus>;
    const next: LessonProgressMap = {};

    for (const [key, value] of Object.entries(parsed)) {
      const lessonId = Number(key);
      if (
        Number.isInteger(lessonId) &&
        (value === "viewed" || value === "started" || value === "completed")
      ) {
        next[lessonId] = value;
      }
    }

    return next;
  } catch {
    return {};
  }
}

function persistProgress(progress: LessonProgressMap) {
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<LessonProgressMap>({});

  useEffect(() => {
    setProgress(parseProgress(localStorage.getItem(PROGRESS_STORAGE_KEY)));

    const handleStorage = (event: StorageEvent) => {
      if (event.key === PROGRESS_STORAGE_KEY) {
        setProgress(parseProgress(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const getStatus = useCallback(
    (lessonId: number) => progress[lessonId],
    [progress],
  );

  const setStatus = useCallback(
    (lessonId: number, status: LessonProgressStatus) => {
      setProgress((current) => {
        const existing = current[lessonId];
        if (existing && progressOrder[existing] >= progressOrder[status]) {
          return current;
        }

        const next = {
          ...current,
          [lessonId]: status,
        };
        persistProgress(next);
        return next;
      });
    },
    [],
  );

  const ensureViewed = useCallback((lessonId: number) => {
    setProgress((current) => {
      const existing = current[lessonId];
      if (existing) return current;

      const next = {
        ...current,
        [lessonId]: "viewed" as const,
      };
      persistProgress(next);
      return next;
    });
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      getStatus,
      setStatus,
      ensureViewed,
    }),
    [ensureViewed, getStatus, progress, setStatus],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }

  return context;
}

export function useLessonProgress(lessonId: number) {
  const { getStatus, setStatus, ensureViewed } = useProgress();
  const status = getStatus(lessonId);

  const markViewed = useCallback(() => ensureViewed(lessonId), [ensureViewed, lessonId]);
  const markStarted = useCallback(
    () => setStatus(lessonId, "started"),
    [lessonId, setStatus],
  );
  const markCompleted = useCallback(
    () => setStatus(lessonId, "completed"),
    [lessonId, setStatus],
  );

  return useMemo(
    () => ({
      status,
      markViewed,
      markStarted,
      markCompleted,
    }),
    [markCompleted, markStarted, markViewed, status],
  );
}
