import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Input from '../index';

describe('Input', () => {
  it('renders without error', () => {
    const { container } = render(<Input />);
    expect(container).toBeInTheDocument();
  });
});
