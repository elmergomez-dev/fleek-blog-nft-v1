import { defineConfig } from "tinacms";

// Determine the branch (for HEAD or CI environments)
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Ensure required env vars are set
if (!process.env.TINA_CLIENT_ID) {
  throw new Error("Missing TINA_CLIENT_ID environment variable");
}
if (!process.env.TINA_TOKEN) {
  throw new Error("Missing TINA_TOKEN environment variable");
}

export default defineConfig({
  branch,

  // These values are now sourced from environment variables
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  // Tell the generated client where to find your local GraphQL server:
  client: {
    url: process.env.TINA_GRAPHQL_URL || "http://localhost:8889/graphql",
  },

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt / Summary",
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
          },
        ],
      },
    ],
  },
});
