const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Props = {
  height?: number;
  width?: number;
};

export function ZitadelLogo({ height = 40, width = 147.5 }: Props) {
  return (
    <>
      <div className="hidden dark:flex">
        <img height={height} width={width} src={`${basePath}/zitadel-logo-light.svg`} alt="fion logo" />
      </div>
      <div className="flex dark:hidden">
        <img height={height} width={width} src={`${basePath}/zitadel-logo-dark.svg`} alt="fion logo" />
      </div>
    </>
  );
}
