import React from 'react';

import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';

import Button from '../button';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toBeInTheDocument();
  });

  it('handles onClick', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders disabled button', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    const button = getByText('Disabled').closest('button');
    expect(button).toBeDisabled();
    fireEvent.click(getByText('Disabled'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders loading button', () => {
    const { container } = render(<Button loading>Loading</Button>);
    expect(container.querySelector('.trontium-btn-loading')).toBeTruthy();
  });

  it('renders primary button', () => {
    const { container } = render(<Button type="primary">Primary</Button>);
    expect(container.querySelector('.trontium-btn-primary')).toBeTruthy();
  });
});
