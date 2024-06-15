import { render, screen } from '@testing-library/react';

import React from 'react';
import Spinner from './Spinner';

describe('Spinner Component', () => {
  test('renders loading spinner', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
