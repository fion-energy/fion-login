// Default <head> tags we want shared across the app
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function DefaultTags() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        href={`${basePath}/favicon/apple-touch-icon.png`}
        rel="apple-touch-icon"
        sizes="180x180"
      />
      <link
        href={`${basePath}/favicon/favicon.png`}
        rel="icon"
        type="image/png"
      />
      <link href={`${basePath}/favicon/favicon.ico`} rel="shortcut icon" />
    </>
  );
}
