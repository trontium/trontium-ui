export interface ComponentSchema {
  /** 组件唯一标识 UUID */
  id: string;
  /** 组件名称，对应组件映射表中的 Key，例如 'Button', 'Input' */
  name: string;
  /** 组件属性 */
  props: Record<string, any>;
  /** 子组件 */
  children?: ComponentSchema[];
}
