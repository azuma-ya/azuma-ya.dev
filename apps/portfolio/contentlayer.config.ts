import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const InternalBlog = defineDocumentType(() => ({
  name: "InternalBlog",
  filePathPattern: "blog/**/*.md",
  fields: {
    title: { type: "string", required: true },
    createdAt: { type: "string", required: true },
    updatedAt: { type: "string", required: false },
    description: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (blog) => blog._raw.sourceFileName.replace(/\.md$/, ""),
    },
    categories: {
      type: "list",
      of: {
        type: "string",
      },
      resolve: (blog) =>
        blog._raw.sourceFileDir.replace(/\.md$/, "").split("/").slice(1),
    },
  },
}));

export const ExternalBlog = defineDocumentType(() => ({
  name: "ExternalBlog",
  filePathPattern: "blog/**/*.md",
  fields: {
    title: { type: "string", required: true },
    createdAt: { type: "string", required: true },
    updatedAt: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: true },
    url: { type: "string", required: true },
  },
  computedFields: {
    categories: {
      type: "list",
      of: {
        type: "string",
      },
      resolve: (blog) =>
        blog._raw.sourceFileDir.replace(/\.md$/, "").split("/").slice(1),
    },
  },
}));

export default makeSource({
  contentDirPath: "public/content",
  contentDirInclude: ["blog"],
  documentTypes: [InternalBlog, ExternalBlog],
});
