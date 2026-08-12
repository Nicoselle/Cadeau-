import { formatDate } from "@/lib/utils";

export function LastUpdated({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  return (
    <p className={className}>
      Laatst bijgewerkt:{" "}
      <time dateTime={date} className="font-medium text-foreground">
        {formatDate(date)}
      </time>
    </p>
  );
}
