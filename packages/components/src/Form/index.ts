import InternalForm from './Form';
import FormItem from './FormItem';
import type { FormProps, FormItemProps } from './interface';

type InternalFormType = typeof InternalForm;

interface FormInterface extends InternalFormType {
  Item: typeof FormItem;
}

const Form = InternalForm as FormInterface;

Form.Item = FormItem;

export { Form, FormProps, FormItemProps };
