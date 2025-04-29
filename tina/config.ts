import { defineConfig } from "tinacms";

// Determine the branch (for HEAD or CI environments)
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  clientId: "43d7eb89-81d4-46c3-b542-319fb88f77a5",
  token: "b9aa367fd90c792a3b6d8e010d011f78f20b1575",

  // Tell the generated client where to find your local GraphQL server:
  client: {
    // Use the Next.js proxy in dev, and fall back to Tina Cloud in prod
    url:
      process.env.NODE_ENV === "development"
        ? "/api/graphql"
        : process.env.TINA_GRAPHQL_URL!,
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
