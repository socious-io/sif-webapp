import './index.module.scss';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import styles from './index.module.scss';
import { RichTextEditorProps } from './index.types';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className={styles['menu']}>
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? styles['menu-button-active'] : styles['menu-button']}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive('italic') ? `${styles['menu-button-active']} italic` : `${styles['menu-button']} italic`
          }
        >
          i
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={
            editor.isActive('underline')
              ? `${styles['menu-button-active']} underline`
              : `${styles['menu-button']} underline`
          }
        >
          u
        </button>
      </div>
    </div>
  );
};

const RichTextEditor: React.FC<RichTextEditorProps & { setValue: any; label?: string }> = ({
  value = '',
  onChange,
  placeholder,
  setValue,
  label,
}) => {
  const extensions = [
    Placeholder.configure({ placeholder, emptyNodeClass: 'is-empty' }),
    StarterKit.configure({
      bold: { HTMLAttributes: { class: 'font-bold' } },
      italic: { HTMLAttributes: { class: 'italic' } },
    }),
    Underline.configure({ HTMLAttributes: { class: 'underline' } }),
  ];

  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValue('description', html, { shouldValidate: true });
      onChange?.(html);
    },
  });

  if (!editor) return null;

  return (
    <>
      {label && (
        <div className={'mb-2'}>
          <label className={styles['label']}>{label}</label>{' '}
        </div>
      )}
      <div className={styles['container']}>
        <div className={styles['editor-wrapper']}>
          <EditorContent editor={editor} />
          <MenuBar editor={editor} />
        </div>
      </div>
    </>
  );
};

export default RichTextEditor;
