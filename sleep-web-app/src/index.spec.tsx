import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './app/store';
import App from './app/App';

jest.mock('./app/App', () => () => <div>Mocked App Component</div>);

describe('index.tsx', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const queryClient = new QueryClient();
    render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
        </QueryClientProvider>
      </React.StrictMode>
    );


    expect(screen.getByText('Mocked App Component')).toBeInTheDocument();
  });
});
