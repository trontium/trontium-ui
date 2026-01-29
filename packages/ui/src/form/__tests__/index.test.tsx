import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Form from '../index';

describe('Form', () => {
  it('renders without error', () => {
    const { container } = render(
      <Form>
        <Form.Item label="Test">
          <input />
        </Form.Item>
      </Form>,
    );
    expect(container).toBeInTheDocument();
  });

  it('renders label correctly', () => {
    const { getByText } = render(
      <Form>
        <Form.Item label="Username">
          <input />
        </Form.Item>
      </Form>,
    );
    expect(getByText('Username')).toBeInTheDocument();
  });
});
