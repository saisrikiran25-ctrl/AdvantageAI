
import React from 'react';
// In a real app, you would use a library like 'react-markdown' here.
// For this example, we'll simulate it with a simple parser and Tailwind's prose classes.
// This is a basic simulation for demonstration purposes.

// A very simple function to convert markdown-like syntax to HTML
const simpleMarkdownToHtml = (markdown: string) => {
    return markdown
        .split('\n')
        .map(line => {
            line = line.trim();
            if (line.startsWith('###')) return `<h3>${line.substring(4)}</h3>`;
            if (line.startsWith('##')) return `<h2>${line.substring(3)}</h2>`;
            if (line.startsWith('#')) return `<h1>${line.substring(2)}</h1>`;
            if (line.startsWith('* ')) return `<li>${line.substring(2)}</li>`;
            if (line.trim() === '') return '<br />';
            return `<p>${line}</p>`;
        })
        .join('')
        .replace(/<li><br \/>/g, '<li>') // Clean up extra breaks
        .replace(/<\/li><p>/g, '</li></ul><p>') // Close list if paragraph follows
        .replace(/<p><li>/g, '<p><ul><li>'); // Open list if list item is inside p
};


interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    // In a real app with a proper markdown library, you'd do:
    // import ReactMarkdown from 'react-markdown';
    // return <ReactMarkdown className="prose prose-invert ...">{content}</ReactMarkdown>

    const htmlContent = simpleMarkdownToHtml(content);

    return (
        <div
            className="prose prose-invert prose-sm md:prose-base max-w-none 
                       prose-headings:text-brand-blue prose-p:text-slate-300 
                       prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    );
};
