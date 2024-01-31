import "@mdxeditor/editor/style.css";

// importing the editor and the plugin from their full paths
import { MDXEditor, MDXEditorProps } from "@mdxeditor/editor/MDXEditor";
import { headingsPlugin } from "@mdxeditor/editor/plugins/headings";
import { BoldItalicUnderlineToggles } from "@mdxeditor/editor/plugins/toolbar/components/BoldItalicUnderlineToggles";
import { toolbarPlugin } from "@mdxeditor/editor/plugins/toolbar";
import {
  BlockTypeSelect,
  CreateLink,
  InsertImage,
  ListsToggle,
  MDXEditorMethods,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
} from "@mdxeditor/editor";
import { forwardRef } from "react";

const MarkdownEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => {
    return (
      <MDXEditor contentEditableClassName="markdown"  className="toolbar" ref={ref} plugins={setupPlugins(props.readOnly)} {...props} />
    );
  }
);

function setupPlugins(isReadOnly: boolean = false) {
  const plugins = [
    headingsPlugin(),
    listsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({
      
      imageUploadHandler: () =>
        Promise.resolve("https://picsum.photos/200/300"),
    }),
  ];

  const toolbarPlugins = toolbarPlugin({
    toolbarContents: () => (
      <>
        <BoldItalicUnderlineToggles />
        <BlockTypeSelect />
        <CreateLink />
        <InsertImage />
        <ListsToggle />
      </>
    ),
  });

  if (isReadOnly) return plugins;
  return [...plugins, toolbarPlugins];
}

export default MarkdownEditor;
