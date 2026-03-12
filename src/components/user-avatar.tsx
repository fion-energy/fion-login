import { Avatar } from "@/components/avatar";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
  loginName?: string;
  displayName?: string;
  showDropdown: boolean;
  searchParams?: Record<string | number | symbol, string | undefined>;
  label?: string;
};

export function UserAvatar({ loginName, displayName, showDropdown, searchParams, label }: Props) {
  const params = new URLSearchParams({});

  if (searchParams?.sessionId) {
    params.set("sessionId", searchParams.sessionId);
  }

  if (searchParams?.organization) {
    params.set("organization", searchParams.organization);
  }

  if (searchParams?.requestId) {
    params.set("requestId", searchParams.requestId);
  }

  if (searchParams?.loginName) {
    params.set("loginName", searchParams.loginName);
  }

  return (
    <div className="flex flex-col gap-1.5 text-sm">
      {label && (
        <span className="font-medium text-gray-900 dark:text-gray-50">{label}</span>
      )}
      <div className="flex h-9 flex-row items-center rounded-lg border border-gray-200 px-1 dark:border-gray-800">
        <div>
          <Avatar size="small" name={displayName ?? loginName ?? ""} loginName={loginName ?? ""} />
        </div>
        <span className="ml-3 max-w-[250px] overflow-hidden text-ellipsis text-sm text-gray-900 dark:text-gray-50">{loginName}</span>
        <span className="flex-grow"></span>
        {showDropdown && (
          <Link
            href={"/accounts?" + params}
            className="ml-4 mr-0.5 flex items-center justify-center rounded-md p-1 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronDownIcon className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
