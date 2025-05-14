// MenuBar.tsx
"use client";

import { useState } from "react";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Heading2,
    Quote,
    Palette,
    Highlighter,
    Link as LinkIcon,
    Undo,
    Redo,
    Type,
    Image as ImageIcon,
} from "lucide-react";

const MenuBar = ({ editor }) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showHighlightPicker, setShowHighlightPicker] = useState(false);
    const [showFontSize, setShowFontSize] = useState(false);

    if (!editor) {
        return null;
    }

    const colors = [
        "#000000",
        "#434343",
        "#666666",
        "#999999",
        "#b7b7b7",
        "#cccccc",
        "#d9d9d9",
        "#efefef",
        "#f3f3f3",
        "#ffffff",
        "#980000",
        "#ff0000",
        "#ff9900",
        "#ffff00",
        "#00ff00",
        "#00ffff",
        "#4a86e8",
        "#0000ff",
        "#9900ff",
        "#ff00ff",
    ];

    const fontSizes = [
        "8px",
        "10px",
        "12px",
        "14px",
        "16px",
        "18px",
        "20px",
        "24px",
        "28px",
        "32px",
        "36px",
    ];

    const setLink = () => {
        const url = window.prompt("URL:");
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt("Enter the URL of the image:");
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    // Base classes for menu buttons
    const buttonBaseClass = "p-2 rounded text-gray-200 hover:bg-gray-600";
    const buttonActiveClass = "bg-gray-500";

    return (
        <div className="border-b border-gray-600 p-2 bg-gray-800 text-gray-200">
            <div className="flex flex-wrap gap-2">
                {/* Text Style Controls */}
                <div className="flex gap-1 border-r border-gray-600 pr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`${buttonBaseClass} ${editor.isActive("bold") ? buttonActiveClass : ""}`}
                        title="Bold"
                    >
                        <Bold size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`${buttonBaseClass} ${editor.isActive("italic") ? buttonActiveClass : ""}`}
                        title="Italic"
                    >
                        <Italic size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`${buttonBaseClass} ${editor.isActive("underline") ? buttonActiveClass : ""}`}
                        title="Underline"
                    >
                        <UnderlineIcon size={16} />
                    </button>
                </div>

                {/* Alignment Controls */}
                <div className="flex gap-1 border-r border-gray-600 pr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                        className={`${buttonBaseClass} ${editor.isActive({ textAlign: "left" }) ? buttonActiveClass : ""}`}
                        title="Align Left"
                    >
                        <AlignLeft size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                        className={`${buttonBaseClass} ${editor.isActive({ textAlign: "center" }) ? buttonActiveClass : ""}`}
                        title="Align Center"
                    >
                        <AlignCenter size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                        className={`${buttonBaseClass} ${editor.isActive({ textAlign: "right" }) ? buttonActiveClass : ""}`}
                        title="Align Right"
                    >
                        <AlignRight size={16} />
                    </button>
                </div>

                {/* List Controls */}
                <div className="flex gap-1 border-r border-gray-600 pr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`${buttonBaseClass} ${editor.isActive("bulletList") ? buttonActiveClass : ""}`}
                        title="Bullet List"
                    >
                        <List size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`${buttonBaseClass} ${editor.isActive("orderedList") ? buttonActiveClass : ""}`}
                        title="Numbered List"
                    >
                        <ListOrdered size={16} />
                    </button>
                </div>

                {/* Font Size Control */}
                <div className="flex gap-1 border-r border-gray-600 pr-2 relative">
                    <button
                        type="button"
                        onClick={() => setShowFontSize(!showFontSize)}
                        className={buttonBaseClass}
                        title="Font Size"
                    >
                        <Type size={16} />
                    </button>
                    {showFontSize && (
                        <div className="absolute top-full left-0 mt-2 p-2 bg-gray-800 text-gray-200 shadow-lg rounded-lg z-20 border border-gray-600 min-w-[100px]">
                            {fontSizes.map((size) => (
                                <button
                                    type="button"
                                    key={size}
                                    className="block w-full text-left px-3 py-1.5 text-gray-200 hover:bg-gray-600 rounded transition-colors"
                                    onClick={() => {
                                        editor.chain().focus().setFontSize(size).run();
                                        setShowFontSize(false);
                                    }}
                                >
                                    <span style={{ fontSize: size }}>{size}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Format Controls */}
                <div className="flex gap-1 border-r border-gray-600 pr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`${buttonBaseClass} ${editor.isActive("heading", { level: 2 }) ? buttonActiveClass : ""}`}
                        title="Heading"
                    >
                        <Heading2 size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`${buttonBaseClass} ${editor.isActive("blockquote") ? buttonActiveClass : ""}`}
                        title="Quote"
                    >
                        <Quote size={16} />
                    </button>
                </div>

                {/* Color Controls */}
                <div className="flex gap-1 border-r border-gray-600 pr-2 relative">
                    <button
                        type="button"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className={buttonBaseClass}
                        title="Text Color"
                    >
                        <Palette size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowHighlightPicker(!showHighlightPicker)}
                        className={buttonBaseClass}
                        title="Highlight Color"
                    >
                        <Highlighter size={16} />
                    </button>
                    {showColorPicker && (
                        <div className="absolute top-full left-0 mt-2 p-2 bg-gray-800 shadow-lg rounded-lg z-20 border border-gray-600 grid grid-cols-10 gap-1">
                            {colors.map((color) => (
                                <button
                                    type="button"
                                    key={color}
                                    className="w-6 h-6 rounded-full border border-gray-600 hover:scale-110 transition-transform"
                                    style={{ backgroundColor: color }}
                                    onClick={() => {
                                        editor.chain().focus().setColor(color).run();
                                        setShowColorPicker(false);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                    {showHighlightPicker && (
                        <div className="absolute top-full left-0 mt-2 p-2 bg-gray-800 shadow-lg rounded-lg z-20 border border-gray-600 grid grid-cols-10 gap-1">
                            {colors.map((color) => (
                                <button
                                    type="button"
                                    key={color}
                                    className="w-6 h-6 rounded-full border border-gray-600 hover:scale-110 transition-transform"
                                    style={{ backgroundColor: color }}
                                    onClick={() => {
                                        editor.chain().focus().setHighlight({ color }).run();
                                        setShowHighlightPicker(false);
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Link Control */}
                <div className="flex gap-1 border-r border-gray-600 pr-2">
                    <button
                        type="button"
                        onClick={setLink}
                        className={`${buttonBaseClass} ${editor.isActive("link") ? buttonActiveClass : ""}`}
                        title="Add Link"
                    >
                        <LinkIcon size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={addImage}
                        className={buttonBaseClass}
                        title="Add Image"
                    >
                        <ImageIcon size={16} />
                    </button>
                </div>

                {/* Undo/Redo Controls */}
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().undo().run()}
                        className={buttonBaseClass}
                        title="Undo"
                    >
                        <Undo size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().redo().run()}
                        className={buttonBaseClass}
                        title="Redo"
                    >
                        <Redo size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuBar;