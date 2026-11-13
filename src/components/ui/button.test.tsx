/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/button';

describe('Button component', () => {
  
  test('display the passed label prop', () => {
    render(<Button label="Save" />);
    
    const button = screen.getByRole('button', { name: /save/i });
    expect(button).toBeTruthy();
  });

  test('calls the onClick function when it is clicked', async () => {
    const handleClick = vi.fn();
    
    render(<Button label="Click me" onClick={handleClick} />);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

});