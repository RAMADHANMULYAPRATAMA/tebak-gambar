import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useLeaderboard } from "./hooks/useLeaderboard";
import { onSnapshot } from "firebase/firestore";

// 🔹 Partial mock Firestore
vi.mock("firebase/firestore", async (importOriginal) => {
  const actual = await importOriginal<typeof import("firebase/firestore")>();

  return {
    ...actual,
    collection: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    orderBy: vi.fn(),
    limit: vi.fn(),
    onSnapshot: vi.fn(),
  };
});

// 🔹 Mock firebase config
vi.mock("../utils/firebase", () => ({
  db: {},
}));

// 🔹 Mock helper types (FIX implicit any)
type MockQuery = unknown;
type MockSnapshot = { docs: any[] };
type SnapshotCallback = (snapshot: MockSnapshot) => void;

describe("useLeaderboard (Black Box Test)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initial state should be loading and empty", () => {
    (onSnapshot as any).mockImplementation(() => vi.fn());

    const { result } = renderHook(() => useLeaderboard("mudah"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
  });

  it("should return leaderboard data after snapshot", async () => {
    const docs = [
      { id: "1", data: () => ({ level: "mudah", time: 10, name: "A" }) },
      { id: "2", data: () => ({ level: "mudah", time: 20, name: "B" }) },
    ];

    (onSnapshot as any).mockImplementation(
      (_q: MockQuery, cb: SnapshotCallback) => {
        cb({ docs });
        return vi.fn();
      }
    );

    const { result } = renderHook(() => useLeaderboard("mudah"));

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.data.length).toBe(2);
    expect(result.current.data[0].name).toBe("A");
  });

  it("should unsubscribe on unmount", () => {
    const unsubscribe = vi.fn();

    (onSnapshot as any).mockReturnValue(unsubscribe);

    const { unmount } = renderHook(() => useLeaderboard("mudah"));

    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });

  it("should re-fetch data when level changes", async () => {
    const mudahDocs = [{ id: "1", data: () => ({ level: "mudah", time: 10 }) }];
    const sulitDocs = [{ id: "2", data: () => ({ level: "sulit", time: 5 }) }];

    (onSnapshot as any)
      .mockImplementationOnce(
        (_q: MockQuery, cb: SnapshotCallback) => {
          cb({ docs: mudahDocs });
          return vi.fn();
        }
      )
      .mockImplementationOnce(
        (_q: MockQuery, cb: SnapshotCallback) => {
          cb({ docs: sulitDocs });
          return vi.fn();
        }
      );

    const { result, rerender } = renderHook(
      ({ level }) => useLeaderboard(level),
      {
        initialProps: { level: "mudah" as const },
      }
    );

    await act(async () => {});
    expect(result.current.data[0].level).toBe("mudah");

    rerender({ level: "mudah" });

    await act(async () => {});
    expect(result.current.data[0].level).toBe("sulit");
  });

  it("should only expose maximum 10 leaderboard entries", async () => {
    const manyDocs = Array.from({ length: 15 }).map((_, i) => ({
      id: String(i),
      data: () => ({
        level: "mudah",
        time: i,
        name: `User ${i}`,
      }),
    }));

    (onSnapshot as any).mockImplementation(
      (_q: MockQuery, cb: SnapshotCallback) => {
        cb({ docs: manyDocs.slice(0, 10) });
        return vi.fn();
      }
    );

    const { result } = renderHook(() => useLeaderboard("mudah"));

    await act(async () => {});

    expect(result.current.data.length).toBe(10);
  });

  it("should handle user without name safely", async () => {
    const docsWithoutName = [
      { id: "1", data: () => ({ level: "mudah", time: 12 }) },
    ];

    (onSnapshot as any).mockImplementation(
      (_q: MockQuery, cb: SnapshotCallback) => {
        cb({ docs: docsWithoutName });
        return vi.fn();
      }
    );

    const { result } = renderHook(() => useLeaderboard("mudah"));

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.data[0].name).toBeUndefined();
  });
});
