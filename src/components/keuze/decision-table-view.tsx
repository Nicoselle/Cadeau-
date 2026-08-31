import type { DecisionTable } from "@/lib/keuze";

export function DecisionTableView({ table }: { table: DecisionTable }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        <caption className="mb-2 text-left text-sm font-medium">
          {table.name}{" "}
          <span className="font-normal text-muted-foreground">
            · hit policy {table.hitPolicy}
          </span>
        </caption>
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-3 py-2 font-medium">Regel</th>
            {table.inputIds.map((id) => (
              <th key={id} className="px-3 py-2 font-medium">
                {id}
              </th>
            ))}
            {table.outputIds.map((id) => (
              <th key={id} className="px-3 py-2 font-medium text-accent">
                {id}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rules.map((rule) => (
            <tr key={rule.id} className="border-b border-border/70">
              <td className="px-3 py-2">
                <div className="font-medium">{rule.label}</div>
                {rule.annotation ? (
                  <div className="text-xs text-muted-foreground">
                    {rule.annotation}
                  </div>
                ) : null}
              </td>
              {table.inputIds.map((id) => (
                <td key={id} className="px-3 py-2 font-mono text-xs">
                  {rule.conditions[id] ?? "—"}
                </td>
              ))}
              {table.outputIds.map((id) => (
                <td key={id} className="px-3 py-2 font-mono text-xs">
                  {String(rule.outputs[id] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
