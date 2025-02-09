import { Skeleton } from "../ui/skeleton";

const ProfileInfo = ({
  title,
  value,
  isLoading = false,
}: {
  title: string;
  value: string | number | `0x${string}`;
  isLoading?: boolean;
}) => {
  return (
    <div className="space-y-1">
      <p className="text-sm font-semibold">{title}</p>
      {isLoading ? (
        <Skeleton className="h-6 w-40 rounded-md object-cover" />
      ) : (
        <p className="text-base font-medium leading-none">{value}</p>
      )}
    </div>
  );
};

export default ProfileInfo;
