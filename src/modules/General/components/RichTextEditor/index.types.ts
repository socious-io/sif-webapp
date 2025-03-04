export interface RichTextEditorProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  setValue?: any;
  register?: any;
  errors?: string[];
}
