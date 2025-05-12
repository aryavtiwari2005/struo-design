"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import MenuBar from "./MenuBar";
import { FontSize } from "./FontSize";
import Placeholder from "@tiptap/extension-placeholder";

const RichTextEditor = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph", "image"],
            }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            Link.configure({
                openOnClick: false,
            }),
            FontSize,
            Image.configure({
                HTMLAttributes: {
                    class: "max-w-full h-auto",
                },
            }),
            Placeholder.configure({
                placeholder: "Write your blog content here...",
                emptyEditorClass: "is-editor-empty",
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="rich-text-editor border border-gray-300 rounded-md bg-white text-black">
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className="p-4 min-h-[200px] bg-white text-black prose prose-sm max-w-none focus:outline-none"
            />
        </div>
    );
};

export default RichTextEditor;