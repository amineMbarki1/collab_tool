import MarkdownEditor from "./MarkdownEditor";
import "./MarkdownEditor.css";

export default function MarkdownReader({ markdown }: { markdown: string }) {
  return (
    <MarkdownEditor
      markdown={markdown}
      readOnly
      contentEditableClassName="readonly markdown"
    />
  );
}
