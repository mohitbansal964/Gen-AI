import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import App from './App';
import React from 'react';

describe('App Component', () => {
  test('renders Weather App title', () => {
    render(<App />);
    expect(screen.getByText('Weather App')).toBeInTheDocument();
  });

  test('fetches and displays weather data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          success: true,
          weather: {
            city: 'New York',
            description: 'Sunny',
            temperature: 25,
            humidity: 60,
          },
        }),
      })
    );

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Enter city'), { target: { value: 'New York' } });
    fireEvent.click(screen.getByText('Get Weather'));

    await waitFor(() => expect(screen.getByText('Description: Sunny')).toBeInTheDocument());
    expect(screen.getByText('Temperature: 25 °C')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 60 %')).toBeInTheDocument();
  });

  test('displays error message on fetch failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          success: false,
          errorMessage: 'City not found',
        }),
      })
    );

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Enter city'), { target: { value: 'Unknown City' } });
    fireEvent.click(screen.getByText('Get Weather'));

    await waitFor(() => expect(screen.getByText('City not found')).toBeInTheDocument());
  });

  test('displays loading spinner during fetch', async () => {
    global.fetch = jest.fn(() =>
      new Promise((resolve) => {
        setTimeout(() => resolve({
          json: () => Promise.resolve({
            success: true,
            weather: {
              city: 'New York',
              description: 'Sunny',
              temperature: 25,
              humidity: 60,
            },
          }),
        }), 1000);
      })
    );

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Enter city'), { target: { value: 'New York' } });
    fireEvent.click(screen.getByText('Get Weather'));

    expect(screen.getByRole('status')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  });
});
