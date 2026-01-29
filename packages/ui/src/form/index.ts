import Form from './Form';
import './style';
import { useForm } from './useForm';

type InternalFormType = typeof Form;

interface RefFormType extends InternalFormType {
  useForm: typeof useForm;
}

const RefForm: RefFormType = Form as RefFormType;

// Explicitly assign static methods
RefForm.useForm = useForm;

export default RefForm;
