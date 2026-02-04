import type { ComponentSchema } from '../types';

export const generateCode = (schema: ComponentSchema): string => {
  const generateProps = (props: any) => {
    return (
      Object.entries(props)
        // 过滤掉 children 和内部属性
        .filter(([key]) => key !== 'children' && !key.startsWith('_'))
        .map(([key, value]) => {
          if (key === 'style' && typeof value === 'object') {
            // 处理 style 对象
            return `style={${JSON.stringify(value)}}`;
          }
          if (typeof value === 'object') {
            return `${key}={${JSON.stringify(value)}}`;
          }
          if (typeof value === 'boolean') {
            return value ? key : `${key}={false}`;
          }
          if (typeof value === 'number') {
            return `${key}={${value}}`;
          }
          return `${key}="${value}"`;
        })
        .join(' ')
    );
  };

  const traverse = (node: ComponentSchema, indent: number = 0): string => {
    const spaces = '  '.repeat(indent);
    const { name, props, children } = node;
    const propsString = generateProps(props || {});

    // 如果是 Image 组件，特殊处理自闭合
    if (name === 'Image' || name === 'img') {
      const src = props.src || 'https://via.placeholder.com/150';
      return `${spaces}<img src="${src}" ${propsString} />`;
    }

    // 自闭合标签或无子元素
    if (!children || (Array.isArray(children) && children.length === 0)) {
      // 特殊处理 Page
      if (name === 'Page') {
        return `${spaces}<div style={{ minHeight: '100%', ...${JSON.stringify(
          props.style || {},
        )} }}></div>`;
      }
      // 文本内容
      if (typeof props.children === 'string') {
        return `${spaces}<${name} ${propsString}>${props.children}</${name}>`;
      }
      return `${spaces}<${name} ${propsString} />`;
    }

    let childrenString = '';
    if (Array.isArray(children)) {
      childrenString = children.map((child) => traverse(child, indent + 1)).join('\n');
    }

    if (name === 'Page') {
      return `${spaces}<div style={{ minHeight: '100%', ...${JSON.stringify(
        props.style || {},
      )} }}>\n${childrenString}\n${spaces}</div>`;
    }

    // Card 等容器组件
    if (name === 'Card') {
      return `${spaces}<div style={${JSON.stringify(
        props.style || {},
      )}}>\n${spaces}  {/* Card Title */}\n${spaces}  <h3>${
        props.title || ''
      }</h3>\n${childrenString}\n${spaces}</div>`;
    }

    return `${spaces}<${name} ${propsString}>\n${childrenString}\n${spaces}</${name}>`;
  };

  // 包装成组件
  return `import React from 'react';
import { Button, Input, Alert } from '@trontium/ui';

export default function MyPage() {
  return (
${traverse(schema, 2)}
  );
}`;
};
