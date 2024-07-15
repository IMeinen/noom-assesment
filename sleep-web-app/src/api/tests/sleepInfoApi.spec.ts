import axios from 'axios';

import {
  getSleepLogByDate,
  postSleepLog,
  getMonthlySleepLogAverages,
} from '../sleepInfoApi';


import { QueryClientProvider,QueryClient } from 'react-query';

const queryClient = new QueryClient();
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('sleepInfoApi', () => {
  beforeEach(() => {
    localStorage.setItem('token', JSON.stringify('test-token'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getSleepLogByDate makes correct API call', async () => {
    const mockData = { id: 1, hours: 8 };
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await getSleepLogByDate('2023-04-01');

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/api/sleep-log?date=2023-04-01'), expect.any(Object));
    expect(result).toEqual(mockData);
  });

  it('postSleepLog sends correct data and headers', async () => {
    const mockData = { id: 1, hours: 8 };
    const payload = { date: '2023-04-01', hours: 8 };
    mockedAxios.post.mockResolvedValue({ data: mockData });

    const result = await postSleepLog(payload as any);

    expect(mockedAxios.post).toHaveBeenCalledWith(expect.stringContaining('/api/sleep-log'), payload, expect.any(Object));
    expect(result).toEqual(mockData);
  });

  it('getMonthlySleepLogAverages makes correct API call', async () => {
    const mockData = { averageHours: 8 };
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await getMonthlySleepLogAverages('2023-04');

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/api/sleep-log/monthly?date=2023-04'), expect.any(Object));
    expect(result).toEqual(mockData);
  });

});
