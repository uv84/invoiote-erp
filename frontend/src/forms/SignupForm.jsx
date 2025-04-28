import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import useLanguage from '@/locale/useLanguage';

export default function SignupForm() {
  const translate = useLanguage();
  return (
    <div>
        <Form.Item
        label={translate('name')}
        name="name"
        rules={[
          {
            required: true,
          },
          {
            type: 'name',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={'admin@demo.com'}
          type="name"
          size="large"
        />
      </Form.Item>
      <Form.Item
        label={translate('email')}
        name="email"
        rules={[
          {
            required: true,
          },
          {
            type: 'email',
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder={'admin@demo.com'}
          type="email"
          size="large"
        />
      </Form.Item>
      <Form.Item
        label={translate('password')}
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={'admin123'}
          size="large"
        />
      </Form.Item>

      
    </div>
  );
}
