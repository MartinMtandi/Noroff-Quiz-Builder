import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '../components/ui/Badge';

describe('Badge component', () => {
  it('renders valid state with green styles and check icon', () => {
    render(<Badge state="valid" text="Valid" />);
    const badge = screen.getByText('Valid');
    expect(badge.className).toContain('bg-success');
    // check icon present (circle + path) via svg element
    expect(badge.querySelector('svg')).toBeTruthy();
  });

  it('renders invalid state with red styles and cross icon', () => {
    render(<Badge state="invalid" text="Invalid" />);
    const badge = screen.getByText('Invalid');
    expect(badge.className).toContain('bg-destructive');
    expect(badge.querySelector('svg')).toBeTruthy();
  });

  it('renders success badge state', () => {
    render(<Badge state="badge" text="Success" />);
    const badge = screen.getByText('Success');
    expect(badge.className).toContain('bg-success');
  });
});
