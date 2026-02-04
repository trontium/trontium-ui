import type { ComponentSchema } from './types';

export const initialSchema: ComponentSchema = {
  id: 'root',
  name: 'Page', // 根节点通常是一个容器
  props: {
    style: { padding: '20px', background: '#f0f2f5', minHeight: '100vh' },
  },
  children: [
    {
      id: 'card-1',
      name: 'Card', // 假设我们后面会封装一个简单的 Card 或者直接用 div
      props: {
        title: '低代码引擎演示',
        style: {
          background: '#fff',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
      children: [
        {
          id: 'btn-1',
          name: 'Button',
          props: {
            type: 'primary',
            children: '主按钮', // 注意：Antd/Trontium UI 的 Button 内容通常也是 props.children，但在 JSON 里如果是纯文本，我们可以特殊处理
          },
        },
        {
          id: 'btn-2',
          name: 'Button',
          props: {
            style: { marginLeft: '12px' },
            children: '次按钮',
          },
        },
        {
          id: 'input-1',
          name: 'Input',
          props: {
            placeholder: '请输入内容...',
            style: { marginTop: '16px', display: 'block' },
          },
        },
      ],
    },
  ],
};
