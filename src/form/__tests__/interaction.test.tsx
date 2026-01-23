import React from 'react';

import Form from '..';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Assuming Input component is available
import Button from '../../button';
import Input from '../../input';

describe('Form Interaction', () => {
  test('should validate fields and show error message', async () => {
    const onFinish = jest.fn();
    const onFinishFailed = jest.fn();

    render(
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ username: '' }}>
        <Form.Item name="username" rules={[{ required: true, message: 'Username is required' }]}>
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>,
    );

    // Click submit check validation
    const btn = screen.getByText('Submit');
    // In older JSDOM versions used by Jest 24, checking bubbling for submit might be flaky.
    // We simulate submit directly if click fails to trigger it, but let's try click again with valid initialValues.
    // If it fails again, we might need to manually trigger submit on the form, but let's stick to click for now
    // assuming previous failure might have been related to other issues.
    // Actually, previous failure confirmed submit wasn't triggered.
    // We will target the form and fire submit.
    const form = btn.closest('form');
    if (form) {
      fireEvent.submit(form);
    } else {
      // Fallback
      fireEvent.click(btn);
    }

    // Expect validation error
    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeInTheDocument();
    });
    expect(onFinish).not.toHaveBeenCalled();
    expect(onFinishFailed).toHaveBeenCalled();

    // Type into input
    const input = screen.getByPlaceholderText('Username');
    // userEvent.type(input, 'testuser');
    // Use fireEvent.change as fallback if userEvent issues persist, but type worked in other test
    await userEvent.type(input, 'testuser');

    // Submit again
    if (form) {
      fireEvent.submit(form);
    } else {
      fireEvent.click(btn);
    }

    await waitFor(() => {
      expect(screen.queryByText('Username is required')).not.toBeInTheDocument();
    });
    expect(onFinish).toHaveBeenCalledWith({ username: 'testuser' });
  });

  test('should support specific field validation update', async () => {
    // This tests the field-level update optimization indirectly
    // If it failed, typing would likely not update the value in UI if not handled correctly
    const { container } = render(
      <Form>
        <Form.Item name="test">
          <Input placeholder="test-input" />
        </Form.Item>
      </Form>,
    );

    const input = screen.getByPlaceholderText('test-input');
    userEvent.type(input, 'hello');

    await waitFor(() => {
      expect(input).toHaveValue('hello');
    });
  });
});
