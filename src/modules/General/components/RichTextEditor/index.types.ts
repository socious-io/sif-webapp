import { Editor } from '@tiptap/react';

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  errors?: string[];
}
