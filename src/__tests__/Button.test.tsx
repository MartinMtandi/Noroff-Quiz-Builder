import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/ui/Button';

const clickText = 'Click me';

describe('Button component', () => {
  it('calls onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>{clickText}</Button>);
    const btn = screen.getByRole('button', { name: clickText });
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  it('applies outline variant classes by default', () => {
    render(<Button>{clickText}</Button>);
    const btn = screen.getByRole('button', { name: clickText });
    expect(btn.className).toContain('border'); // outline style contains border
  });

  it('renders gradient variant with gradient classes', () => {
    render(<Button variant="gradient">{clickText}</Button>);
    const btn = screen.getByRole('button', { name: clickText });
    expect(btn.className).toContain('bg-gradient-to-br');
  });

  it('renders gradientBorder variant with wrapper span', () => {
    render(<Button variant="gradientBorder">{clickText}</Button>);
    const btn = screen.getByRole('button');
    const inner = btn.querySelector('span');
    expect(inner).toBeTruthy();
    // inner span should have group-hover styles applied
    expect(inner!.className).toContain('group-hover');
  });
});
