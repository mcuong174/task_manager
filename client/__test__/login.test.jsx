import Login from "../src/components/pages/Login";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("fullName input should be rendered", () => {
  render(<Login />);
  const fullNameInputEl = screen.getByPlaceholderText(/fullName/i);
  expect(fullNameInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

test("fullName input should be empty", () => {
  render(<Login />);
  const fullNameInputEl = screen.getByPlaceholderText(/fullName/i);
  expect(fullNameInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test("error message should not be visible", () => {
  render(<Login />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

test("fullName input should change", () => {
  render(<Login />);
  const fullNameInputEl = screen.getByPlaceholderText(/fullName/i);
  const testValue = "test";

  fireEvent.change(fullNameInputEl, { target: { value: testValue } });
  expect(fullNameInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

test("button should not be disabled when inputs exist", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const fullNameInputEl = screen.getByPlaceholderText(/fullName/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(fullNameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  expect(buttonEl).not.toBeDisabled();
});

test("loading should be rendered when click", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const fullNameInputEl = screen.getByPlaceholderText(/fullName/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(fullNameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent(/please wait/i);
});

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const fullNameInputEl = screen.getByPlaceholderText(/fullName/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(fullNameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

test("fullNshould be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const fullNameInputEl = screen.getByPlaceholderText(/fullName/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(fullNameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  const fullNtem = await screen.findByText("John");

  expect(fullNtem).toBeInTheDocument();
});
