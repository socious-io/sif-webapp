import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ChangeEvent, useEffect } from 'react';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { RichTextEditorProps } from './index.types';
import IconButton from '../IconButton';

const MenuBar = ({ editor }) => {
  const onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => editor.chain().focus().setImage({ src: reader.result }).run();
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles['menu']}>
      <div className="relative">
        <input type="file" className={styles['file']} onChange={onUploadImage} />
        <IconButton
          iconName="image-01"
          size="medium"
          iconSize={20}
          iconColor={variables.color_grey_600}
          customStyle={styles['button']}
        />
      </div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${styles['button']} ${editor.isActive('bold') && styles['button--active']}`}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`italic ${styles['button']} ${editor.isActive('italic') && styles['button--active']}`}
      >
        i
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`underline ${styles['button']} ${editor.isActive('underline') && styles['button--active']}`}
      >
        u
      </button>
    </div>
  );
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  name,
  label,
  placeholder,
  value = '',
  onChange,
  setValue,
  register,
  errors,
}) => {
  const extensions = [
    Placeholder.configure({ placeholder, emptyNodeClass: 'is-empty' }),
    StarterKit.configure({
      bold: { HTMLAttributes: { class: 'font-bold' } },
      italic: { HTMLAttributes: { class: 'italic' } },
    }),
    Underline.configure({ HTMLAttributes: { class: 'underline' } }),
    Image,
  ];

  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const isEmptyEditor = editor.isEmpty;
      setValue?.(name, isEmptyEditor ? '' : html, { shouldValidate: true });
      onChange?.(html);
    },
  });

  useEffect(() => {
    register?.(name);
  }, [register, name]);

  if (!editor) return null;

  return (
    <div className={styles['main']}>
      {label && <label className={styles['label']}>{label}</label>}
      <div className={`${styles['container']} ${errors ? styles['container--error'] : styles['container--default']}`}>
        <EditorContent editor={editor} />
        <MenuBar editor={editor} />
      </div>
      {errors &&
        errors.map((e, index) => (
          <p key={index} className={styles['errors']}>
            {e}
          </p>
        ))}
    </div>
  );
};

export default RichTextEditor;
