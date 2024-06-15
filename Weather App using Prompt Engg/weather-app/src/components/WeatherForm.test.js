import { fireEvent, render, screen } from '@testing-library/react';

import React from 'react';
import WeatherForm from './WeatherForm';

describe('WeatherForm Component', () => {
  test('renders input and button', () => {
    render(<WeatherForm onSearch={() => {}} />);
    expect(screen.getByPlaceholderText('Enter city')).toBeInTheDocument();
    expect(screen.getByText('Get Weather')).toBeInTheDocument();
  });

  test('calls onSearch with city name', () => {
    const onSearch = jest.fn();
    render(<WeatherForm onSearch={onSearch} />);
    fireEvent.change(screen.getByPlaceholderText('Enter city'), { target: { value: 'New York' } });
    fireEvent.click(screen.getByText('Get Weather'));
    expect(onSearch).toHaveBeenCalledWith('New York');
  });
});
