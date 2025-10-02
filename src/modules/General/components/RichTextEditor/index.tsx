import BulletList from '@tiptap/extension-bullet-list';
import Image from '@tiptap/extension-image';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ChangeEvent, useEffect, useState } from 'react';
import { uploadMediaAdaptor } from 'src/core/adaptors';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { RichTextEditorProps } from './index.types';
import IconButton from '../IconButton';

const MenuBar = ({ editor }) => {
  const [isUploading, setIsUploading] = useState(false);

  const onUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const { error, data } = await uploadMediaAdaptor(file);
        if (!error && data) {
          editor.chain().focus().setImage({ src: data.url }).run();
        } else {
          console.error('Failed to upload image:', error);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className={styles['menu']}>
      <div className="relative">
        <input
          type="file"
          className={styles['file']}
          onChange={onUploadImage}
          disabled={isUploading}
          accept="image/*"
        />
        <IconButton
          iconName="image-01"
          size="medium"
          iconSize={20}
          iconColor={isUploading ? variables.color_grey_400 : variables.color_grey_600}
          customStyle={`${styles['button']} ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      </div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={`${styles['button']} ${editor.isActive('bulletList') && styles['button--active']}`}
        title="Bullet List"
      >
        {'•'}
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={`${styles['button']} ${editor.isActive('orderedList') && styles['button--active']}`}
        title="Numbered List"
      >
        {'1.'}
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${styles['button']} ${editor.isActive('bold') && styles['button--active']}`}
      >
        {'B'}
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`italic ${styles['button']} ${editor.isActive('italic') && styles['button--active']}`}
      >
        {'i'}
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`underline ${styles['button']} ${editor.isActive('underline') && styles['button--active']}`}
      >
        {'u'}
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
      bulletList: false,
      orderedList: false,
      listItem: false,
    }),
    Underline.configure({ HTMLAttributes: { class: 'underline' } }),
    Image.configure({
      inline: true,
      allowBase64: false,
    }),
    BulletList.configure({
      HTMLAttributes: {
        class: 'list-disc pl-5',
      },
    }),
    OrderedList.configure({
      HTMLAttributes: {
        class: 'list-decimal pl-5',
      },
    }),
    ListItem,
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
      <div
        data-testid="description-input"
        className={`${styles['container']} ${errors ? styles['container--error'] : styles['container--default']}`}
      >
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
