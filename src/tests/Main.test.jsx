import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchAPI } from "../api";
import { initializeTimes, updateTimes } from "../components/Main";

vi.mock("../api", () => ({
  fetchAPI: vi.fn(() => ["17:00", "18:00", "19:00"])
}));

describe("available booking times reducer", () => {
  beforeEach(() => vi.clearAllMocks());

  it("initializes times using today's date", () => {
    expect(initializeTimes()).toEqual(["17:00", "18:00", "19:00"]);
    expect(fetchAPI).toHaveBeenCalledTimes(1);
    expect(fetchAPI.mock.calls[0][0]).toBeInstanceOf(Date);
  });

  it("updates times when the date changes", () => {
    const state = ["17:00"];
    const result = updateTimes(state, {
      type: "UPDATE_TIMES",
      payload: "2026-11-05"
    });

    expect(result).toEqual(["17:00", "18:00", "19:00"]);
    expect(fetchAPI).toHaveBeenCalledWith(new Date("2026-11-05T12:00:00"));
  });

  it("keeps the current state for an unknown action", () => {
    const state = ["17:00", "18:00"];
    expect(updateTimes(state, { type: "UNKNOWN" })).toBe(state);
    expect(fetchAPI).not.toHaveBeenCalled();
  });
});