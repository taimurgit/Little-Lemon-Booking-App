import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import { submitAPI } from "../api";

vi.mock("../api", () => ({
  submitAPI: vi.fn(() => true)
}));

function renderForm() {
  const dispatch = vi.fn();
  render(
    <MemoryRouter>
      <BookingForm
        availableTimes={["17:00", "18:00", "19:00", "20:00"]}
        dispatch={dispatch}
      />
    </MemoryRouter>
  );
  return { dispatch };
}

describe("BookingForm", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders all required fields and submit button", () => {
    renderForm();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /make your reservation/i })).toBeInTheDocument();
  });

  it("dispatches an update when the date changes", () => {
    const { dispatch } = renderForm();
    fireEvent.change(screen.getByLabelText(/choose date/i), {
      target: { value: "2026-11-05" }
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "UPDATE_TIMES",
      payload: "2026-11-05"
    });
  });

  it("shows a validation message when no time is selected", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.click(screen.getByRole("button", { name: /make your reservation/i }));
    expect(await screen.findByText(/choose an available time/i)).toBeInTheDocument();
    expect(submitAPI).not.toHaveBeenCalled();
  });

  it("submits valid reservation details", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.selectOptions(screen.getByLabelText(/choose time/i), "18:00");
    await user.clear(screen.getByLabelText(/number of guests/i));
    await user.type(screen.getByLabelText(/number of guests/i), "4");
    await user.selectOptions(screen.getByLabelText(/occasion/i), "Anniversary");
    await user.click(screen.getByRole("button", { name: /make your reservation/i }));

    expect(submitAPI).toHaveBeenCalledWith(expect.objectContaining({
      time: "18:00",
      guests: 4,
      occasion: "Anniversary"
    }));
  });

  it("rejects guest counts outside the allowed range", async () => {
    const user = userEvent.setup();
    renderForm();
    await user.clear(screen.getByLabelText(/number of guests/i));
    await user.type(screen.getByLabelText(/number of guests/i), "11");
    await user.selectOptions(screen.getByLabelText(/choose time/i), "18:00");
    await user.click(screen.getByRole("button", { name: /make your reservation/i }));
    expect(await screen.findByText(/between 1 and 10/i)).toBeInTheDocument();
    expect(submitAPI).not.toHaveBeenCalled();
  });
});