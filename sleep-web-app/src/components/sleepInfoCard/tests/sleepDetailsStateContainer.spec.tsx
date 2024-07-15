import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";
import SleepDetailsStateContainer from '../sleepDetailsStateContainer';
import { FeelingEnum } from 'types/sleepInfoCard.types';



const mockSleepData = {
  bed_time_start: '2023-04-01T22:00:00.000Z',
  bed_time_end: '2023-04-02T06:00:00.000Z',
  feeling: 2
};

const mockStore = configureStore()
const initialState = {
  sleepInfoCard: {
    currentDaySleepData: mockSleepData,
    currentState: 1
  },
};


describe('SleepDetailsStateContainer', () => {
  let store : any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders sleep details correctly', () => {
    render(
      <Provider store={store}>
        <SleepDetailsStateContainer />
      </Provider>
    );

    // Verifica se os detalhes do sono são renderizados corretamente
    expect(screen.getByText(/You felt:/i)).toBeInTheDocument();
    expect(screen.getByText(FeelingEnum[mockSleepData.feeling])).toBeInTheDocument();
    expect(screen.getByText(/8 h 0 min/i)).toBeInTheDocument();
  });

  test('clicking the AVG button dispatches the correct action', () => {


    render(
      <Provider store={store}>
        <SleepDetailsStateContainer />
      </Provider>
    );


    fireEvent.click(screen.getByText('AVG'));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "sleepInfoCard/changeState", payload: 2 });

  });
});
