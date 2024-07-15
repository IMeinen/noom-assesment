// authApi.test.ts
import { login, useLogin } from '../authApi';
import axios from 'axios';
import { useMutation } from 'react-query';

// Mock de axios e useMutation
jest.mock('axios');
jest.mock('react-query', () => ({
  useMutation: jest.fn(),
}));

describe('authApi', () => {
  describe('login', () => {
    it('should call axios.post with correct parameters and return data', async () => {
      const mockData = { token: 'fake-token' };
      (axios.post as jest.Mock).mockResolvedValue({ data: mockData });

      const payload = { username: 'test', password: 'password' };
      const data = await login(payload);

      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_BASE_URL}/api/login`,
        `username=${encodeURIComponent(payload.username)}&password=${encodeURIComponent(payload.password)}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      expect(data).toEqual(mockData);
    });
  });

  describe('useLogin', () => {
    it('should call useMutation with login function', () => {
      useLogin();
      expect(useMutation).toHaveBeenCalledWith(login);
    });
  });
});
