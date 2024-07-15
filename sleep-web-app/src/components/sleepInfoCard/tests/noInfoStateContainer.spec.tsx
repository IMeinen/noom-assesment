import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import NoInfoStateContainer from "../noInfoStateContainer";

const mockStore = configureStore([]);
const store = mockStore({ changeState: jest.fn() });

describe("NoInfoStateContainer", () => {
  test('renders the text "No sleep information"', () => {
    render(
      <Provider store={store}>
        <NoInfoStateContainer />
      </Provider>
    );

    const textElement = screen.getByText(/no sleep information/i);
    expect(textElement).toBeInTheDocument();
  });

  test("clicking the button dispatches the correct action", () => {
    render(
      <Provider store={store}>
        <NoInfoStateContainer />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button"));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "sleepInfoCard/changeState", payload: 3 });
  });
});
