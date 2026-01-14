const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath =
  process.env.BASE_PATH ??
  (repoName && !repoName.endsWith(".github.io") ? `/${repoName}` : "");

const config = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
};

export default config;
