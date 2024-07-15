import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { QueryClient, QueryClientProvider } from 'react-query';
import  SubmitSleepInfoContainer  from '../submitSleepInfoContainer';
import * as sleepInfoApi from 'api/sleepInfoApi';
import { changeCurrentDaySleepData, changeState } from 'app/store/sleepInfoCardSlice';


const mockStore = configureMockStore();
const queryClient = new QueryClient();
const initialState : any = {
  sleepInfoCard: {
    currentDaySleepData: null,
    currentState: 2
  },
};

jest.mock('api/sleepInfoApi', () => ({
  useCreateSleepLog: jest.fn(),
}));

const renderWithProviders = (ui:any, { initialState  , store = mockStore(initialState), ...renderOptions } : any) => {
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    </Provider>,
    renderOptions
  );
};

describe('SubmitSleepInfoContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form correctly', () => {
    jest.spyOn(sleepInfoApi, 'useCreateSleepLog').mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
    } as any);

    renderWithProviders(<SubmitSleepInfoContainer />, { initialState });

    expect(screen.getByLabelText(/time you went to bed/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time you got up/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/how did you feel in the morning\?/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your last night\'s sleep data/i)).toBeInTheDocument();
  });

  test('shows loading state', () => {

    jest.spyOn(sleepInfoApi, 'useCreateSleepLog').mockReturnValue({
      mutate: jest.fn(),
      isLoading: true,
    } as any);

    renderWithProviders(<SubmitSleepInfoContainer />, { initialState });

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('submits form successfully', async () => {
    const mockCreateSleepLog = jest.fn((data, { onSuccess }) => onSuccess({ bed_time_end: new Date().toISOString() }));
    const store = mockStore({});
    store.dispatch = jest.fn();

    jest.spyOn(sleepInfoApi, 'useCreateSleepLog').mockReturnValue({
      mutate: mockCreateSleepLog,
      isLoading: false,
    } as any);

    renderWithProviders(<SubmitSleepInfoContainer />, { store });

    fireEvent.change(screen.getByLabelText(/time you went to bed/i), { target: { value: '2023-07-01T22:00' } });
    fireEvent.change(screen.getByLabelText(/time you got up/i), { target: { value: '2023-07-02T06:00' } });
    fireEvent.change(screen.getByLabelText(/how did you feel in the morning\?/i), { target: { value: '2' } });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(mockCreateSleepLog).toHaveBeenCalledWith(
        {
          bedTimeStart: '2023-07-01 22:00',
          bedTimeEnd: '2023-07-02 06:00',
          feeling: 2,
        },
        expect.any(Object)
      );
    });

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(changeCurrentDaySleepData(expect.any(Object)));
      expect(store.dispatch).toHaveBeenCalledWith(changeState(1));
    });
  });

  test('dispatches changeState action when cancel button is clicked', () => {
    const store = mockStore({});
    store.dispatch = jest.fn();

    jest.spyOn(sleepInfoApi, 'useCreateSleepLog').mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
    } as any);

    renderWithProviders(<SubmitSleepInfoContainer />, { store });

    fireEvent.click(screen.getByText(/cancel/i));

    expect(store.dispatch).toHaveBeenCalledWith(changeState(0));
  });
});
