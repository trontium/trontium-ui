import { createContext } from 'react';

import type { FormInstance } from './interface';

export const FormContext = createContext<FormInstance>({} as FormInstance);
