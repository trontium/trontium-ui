import React from 'react';

import { Button, Form, Input, message } from '@trontium/ui';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('Validation Passed & Submitted!');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Validation Failed, please check.');
  };

  const onReset = () => {
    form.resetFields();
    message.info('Form Reset');
  };

  const onFill = () => {
    form.setFieldsValue({
      username: 'TrontiumUser',
      password: 'password123',
    });
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={onReset}>Reset</Button>
          <Button onClick={onFill}>Fill Form</Button>
        </div>
      </Form.Item>
    </Form>
  );
};
