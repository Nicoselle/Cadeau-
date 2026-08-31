import type { DecisionDefinition, NodeKind } from "@/lib/keuze";
import { assertNever } from "@/lib/keuze";

const COL_W = 180;
const ROW_H = 78;
const PAD = 28;
const BOX_W = 150;
const BOX_H = 48;

function kindFill(kind: NodeKind): string {
  switch (kind) {
    case "input":
      return "hsl(var(--secondary))";
    case "knowledge":
      return "hsl(var(--muted))";
    case "causal":
      return "hsl(152 46% 92%)";
    case "decision":
      return "hsl(var(--card))";
    default:
      return assertNever(kind, "kindFill");
  }
}

function kindStroke(kind: NodeKind): string {
  switch (kind) {
    case "input":
      return "hsl(var(--border))";
    case "knowledge":
      return "hsl(var(--border))";
    case "causal":
      return "hsl(152 46% 36%)";
    case "decision":
      return "hsl(var(--primary))";
    default:
      return assertNever(kind, "kindStroke");
  }
}

export function DecisionGraph({
  definition,
}: {
  definition: DecisionDefinition;
}) {
  const depths = new Map<string, number>();
  const visit = (id: string): number => {
    const cached = depths.get(id);
    if (cached !== undefined) return cached;
    const node = definition.nodes.find((item) => item.id === id);
    if (!node) return 0;
    const depth =
      node.dependsOn.length === 0
        ? 0
        : Math.max(...node.dependsOn.map(visit)) + 1;
    depths.set(id, depth);
    return depth;
  };
  definition.nodes.forEach((node) => visit(node.id));

  const columns = new Map<number, string[]>();
  for (const node of definition.nodes) {
    const depth = depths.get(node.id) ?? 0;
    const column = columns.get(depth) ?? [];
    column.push(node.id);
    columns.set(depth, column);
  }

  const positions = new Map<string, { x: number; y: number }>();
  for (const [depth, ids] of columns) {
    ids.forEach((id, index) => {
      positions.set(id, {
        x: PAD + depth * COL_W,
        y: PAD + index * ROW_H,
      });
    });
  }

  const maxDepth = Math.max(0, ...depths.values());
  const maxRows = Math.max(...[...columns.values()].map((col) => col.length), 1);
  const width = PAD * 2 + (maxDepth + 1) * COL_W;
  const height = PAD * 2 + maxRows * ROW_H;

  return (
    <div className="overflow-x-auto">
      <svg
        role="img"
        aria-label={`Beslissingsgraaf voor ${definition.name}`}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="max-w-full"
      >
        {definition.nodes.flatMap((node) =>
          node.dependsOn.map((dep) => {
            const from = positions.get(dep);
            const to = positions.get(node.id);
            if (!from || !to) return null;
            const x1 = from.x + BOX_W;
            const y1 = from.y + BOX_H / 2;
            const x2 = to.x;
            const y2 = to.y + BOX_H / 2;
            const mid = (x1 + x2) / 2;
            return (
              <path
                key={`${dep}-${node.id}`}
                d={`M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1.5"
              />
            );
          }),
        )}
        {definition.nodes.map((node) => {
          const pos = positions.get(node.id);
          if (!pos) return null;
          return (
            <g key={node.id}>
              <rect
                x={pos.x}
                y={pos.y}
                width={BOX_W}
                height={BOX_H}
                rx="8"
                fill={kindFill(node.kind)}
                stroke={kindStroke(node.kind)}
                strokeWidth="1.5"
              />
              <text
                x={pos.x + 10}
                y={pos.y + 20}
                className="fill-foreground"
                fontSize="11"
                fontWeight="600"
              >
                {truncate(node.name, 22)}
              </text>
              <text
                x={pos.x + 10}
                y={pos.y + 36}
                className="fill-muted-foreground"
                fontSize="10"
              >
                {node.kind}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}
