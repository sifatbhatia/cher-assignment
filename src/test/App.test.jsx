import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the main application', () => {
    render(<App />);

    expect(screen.getByText('Home Learning')).toBeInTheDocument();
    expect(screen.getByText('Home Inspection Basics')).toBeInTheDocument();
  });

  it('shows the module overview by default', () => {
    render(<App />);

    expect(screen.getByText('Start Module')).toBeInTheDocument();
    expect(screen.getByText('Your Progress')).toBeInTheDocument();
  });
});
