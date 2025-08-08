// components/MarkdownViewer.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";
import { Copy, ExternalLink, Check } from "lucide-react";
import "highlight.js/styles/github-dark.css";

const MarkdownViewer = ({
  content,
  className = "",
  enableMath = false,
  enableRawHtml = false,
  enableLineBreaks = false,
  copyButtonText = "Copy",
  onLinkClick = null,
  transparentBg = false, // New prop for background control
}) => {
  const [copiedCode, setCopiedCode] = React.useState(null);

  // Build plugins array based on props
  const remarkPlugins = [
    remarkGfm,
    ...(enableMath ? [remarkMath] : []),
    ...(enableLineBreaks ? [remarkBreaks] : []),
  ];

  const rehypePlugins = [
    rehypeHighlight,
    rehypeSlug, // Adds IDs to headings
    [rehypeAutolinkHeadings, { behavior: "wrap" }], // Makes headings clickable
    ...(enableMath ? [rehypeKatex] : []),
    ...(enableRawHtml ? [rehypeRaw] : []),
  ];

  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(codeId);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const components = {
    // Custom code block with copy button
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const codeId = Math.random().toString(36).substr(2, 9);
      const codeContent = String(children).replace(/\n$/, "");

      if (!inline && match) {
        return (
          <div className="relative group">
            <pre
              className={`${className} !bg-zinc-900 !text-gray-100`}
              {...props}
            >
              <code className={className}>{children}</code>
            </pre>
            <button
              onClick={() => copyToClipboard(codeContent, codeId)}
              className="absolute top-2 right-2 p-1.5 rounded bg-zinc-800 hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
              title={copyButtonText}
            >
              {copiedCode === codeId ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} className="text-gray-300" />
              )}
            </button>
            {match && (
              <span className="absolute top-2 left-3 text-xs text-gray-400 uppercase">
                {match[1]}
              </span>
            )}
          </div>
        );
      }

      return (
        <code
          className={`${className} !bg-zinc-800 !text-orange-300 px-1 py-0.5 rounded text-sm`}
          {...props}
        >
          {children}
        </code>
      );
    },

    // Custom link component with external link indicator
    a({ href, children, ...props }) {
      const isExternal =
        href && (href.startsWith("http") || href.startsWith("//"));

      return (
        <a
          href={href}
          {...props}
          className="!text-blue-400 hover:!text-blue-300 !no-underline hover:!underline inline-flex items-center gap-1"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          onClick={(e) => {
            if (onLinkClick) {
              onLinkClick(e, href);
            }
          }}
        >
          {children}
          {isExternal && <ExternalLink size={12} className="opacity-70" />}
        </a>
      );
    },

    // Custom blockquote styling
    blockquote({ children, ...props }) {
      const bgClass = transparentBg ? "bg-black/20" : "bg-gray-800/30";
      return (
        <blockquote
          className={`!border-l-4 !border-blue-500 !pl-4 !italic !text-gray-300 ${bgClass} !py-2 !my-4 rounded-r`}
          {...props}
        >
          {children}
        </blockquote>
      );
    },

    // Custom table styling
    table({ children, ...props }) {
      return (
        <div className="overflow-x-auto my-6">
          <table
            className="min-w-full border-collapse border border-gray-600"
            {...props}
          >
            {children}
          </table>
        </div>
      );
    },

    th({ children, ...props }) {
      const bgClass = transparentBg ? "bg-black/40" : "bg-gray-800";
      return (
        <th
          className={`border border-gray-600 ${bgClass} px-4 py-2 text-left font-semibold !text-white`}
          {...props}
        >
          {children}
        </th>
      );
    },

    td({ children, ...props }) {
      return (
        <td
          className="border border-gray-600 px-4 py-2 !text-gray-200"
          {...props}
        >
          {children}
        </td>
      );
    },

    // Custom heading components with better spacing and forced colors
    h1: ({ children, ...props }) => (
      <h1
        className="!text-4xl !font-bold !mb-6 !mt-8 !text-teal-400 !border-b !border-gray-600 !pb-2"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="!text-3xl !font-bold !mb-4 !mt-8 !text-teal-300"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="!text-2xl !font-bold !mb-3 !mt-6 !text-teal-200"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 className="!text-xl !font-bold !mb-2 !mt-4 !text-teal-100" {...props}>
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5 className="!text-lg !font-bold !mb-2 !mt-4 !text-gray-200" {...props}>
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6
        className="!text-base !font-bold !mb-2 !mt-4 !text-gray-300"
        {...props}
      >
        {children}
      </h6>
    ),

    // Custom paragraph styling
    p: ({ children, ...props }) => (
      <p className="!text-gray-200 !mb-4 !leading-7" {...props}>
        {children}
      </p>
    ),

    // Custom list styling
    ul: ({ children, ...props }) => (
      <ul
        className="!text-gray-200 !mb-4 !list-disc !list-inside !space-y-1"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="!text-gray-200 !mb-4 !list-decimal !list-inside !space-y-1"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="!text-gray-200" {...props}>
        {children}
      </li>
    ),

    // Custom image component with loading and error handling
    img({ src, alt, ...props }) {
      return (
        <img
          src={src}
          alt={alt}
          className="max-w-full h-auto rounded-lg shadow-lg my-4"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
            // You could show a placeholder or error message here
          }}
          {...props}
        />
      );
    },

    // Custom horizontal rule
    hr: ({ ...props }) => <hr className="!border-gray-600 !my-8" {...props} />,

    // Custom strong/bold text
    strong: ({ children, ...props }) => (
      <strong className="!text-white !font-bold" {...props}>
        {children}
      </strong>
    ),

    // Custom emphasis/italic text
    em: ({ children, ...props }) => (
      <em className="!text-gray-100 !italic" {...props}>
        {children}
      </em>
    ),
  };

  return (
    <div className={`max-w-none text-gray-200 markdown-content ${className}`}>
      <style jsx>{`
        // .markdown-content {
        //   /* Override any prose styles that might interfere */
        // }
        // .markdown-content * {
        //   /* Force text color inheritance where needed */
        //   color: inherit;
        // }
      `}</style>
      <ReactMarkdown
        children={content}
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        components={components}
      />
    </div>
  );
};

export default MarkdownViewer;
