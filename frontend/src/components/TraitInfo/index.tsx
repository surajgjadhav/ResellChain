export interface TraitInfoProps {
  title: string;
  value: string | number;
}

const TraitInfo = ({ title, value }: TraitInfoProps) => {
  return (
    <div className=" flex flex-col items-center justify-between rounded-md border p-2 bg-blue-100 border-blue-300">
      <div className="font-semibold tracking-tight">{title}</div>
      <div className="text-base text-muted-foreground">{value}</div>
    </div>
  );
};

export default TraitInfo;
