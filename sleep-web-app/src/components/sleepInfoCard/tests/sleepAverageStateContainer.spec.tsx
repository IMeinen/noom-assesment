import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as ReactQuery  from 'react-query';
import { Provider } from 'react-redux';
import configureStore from "redux-mock-store";
import SleepAverageStateContainer from '../sleepAverageStateContainer';
import * as sleepInfoApi from 'api/sleepInfoApi';
import { FeelingEnum } from 'types/sleepInfoCard.types';


jest.mock('api/sleepInfoApi', () => ({
  getMonthlySleepLogAverages: jest.fn(),
}));

const mockSleepData = {
  bed_time_start: '2023-04-01T22:00:00.000Z',
  bed_time_end: '2023-04-02T06:00:00.000Z',
  feeling: 2
};

const mockData = {
  first_day_of_month: '2023-07-01',
  last_day_of_month: '2023-07-31',
  average_slept_time: 7.5,
  average_bed_time_start: '22:00',
  average_bed_time_end: '06:00',
  feeling_count: {
    1: 5,
    2: 10,
    3: 15,
  } as { [key: number]: number },
};

const mockStore = configureStore()
const initialState = {
  sleepInfoCard: {
    currentDaySleepData: mockSleepData,
    currentState: 2
  },
};
const store = mockStore(initialState);
const queryClient = new ReactQuery.QueryClient();

describe('SleepAverageStateContainer', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state correctly', () => {
    jest.spyOn(sleepInfoApi, 'getMonthlySleepLogAverages').mockResolvedValueOnce(new Promise(() => {}));
    jest.spyOn(ReactQuery, 'useQuery')
      .mockImplementation(
        jest
          .fn()
          .mockReturnValue({ data: null, isLoading: true, isSuccess: true })
      )
    render(
      <Provider store={store}>
        <ReactQuery.QueryClientProvider client={queryClient}>
          <SleepAverageStateContainer />
        </ReactQuery.QueryClientProvider>
      </Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders sleep average data correctly after loading', async () => {


    jest.spyOn(sleepInfoApi, 'getMonthlySleepLogAverages').mockResolvedValueOnce(mockData as any);
    jest.spyOn(ReactQuery, 'useQuery')
    .mockImplementation(
      jest
        .fn()
        .mockReturnValue({ data: mockData, isLoading: false, isSuccess: true })
    )
    render(
      <Provider store={store}>
        <ReactQuery.QueryClientProvider client={queryClient}>
          <SleepAverageStateContainer />
        </ReactQuery.QueryClientProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('June 30th to July 30th')).toBeInTheDocument();
    });

    Object.values(FeelingEnum).forEach((feeling, index) => {
      expect(screen.getByText(feeling)).toBeInTheDocument();
      expect(screen.getByText(mockData.feeling_count[index + 1])).toBeInTheDocument();
    });

  });

  test('clicking the BACK button dispatches the correct action', () => {
    jest.spyOn(sleepInfoApi, 'getMonthlySleepLogAverages').mockResolvedValueOnce(mockData as any);
    jest.spyOn(ReactQuery, 'useQuery')
    .mockImplementation(
      jest
        .fn()
        .mockReturnValue({ data: mockData , isLoading: false, isSuccess: true })
    )

    render(
      <Provider store={store}>
        <ReactQuery.QueryClientProvider client={queryClient}>
          <SleepAverageStateContainer />
        </ReactQuery.QueryClientProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText('BACK'));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: "sleepInfoCard/changeState", payload: 1 });
  });
});
