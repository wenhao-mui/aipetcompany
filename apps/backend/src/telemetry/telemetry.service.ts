import { Injectable } from "@nestjs/common";
import { Observable, Subject } from "rxjs";

export type TelemetryEvent = {
  id: number;
  at: string;
  kind: "message" | "tool";
  agent: string;
  tool: string;
  text: string;
  arguments: Record<string, unknown>;
};

const MAX_EVENTS = 200;

@Injectable()
export class TelemetryService {
  private nextId = 1;
  private readonly events: TelemetryEvent[] = [];
  private readonly incoming = new Subject<TelemetryEvent>();

  list(): TelemetryEvent[] {
    return [...this.events];
  }

  watch(): Observable<TelemetryEvent> {
    return new Observable((subscriber) => {
      const snapshot = this.events.slice();
      const seen = new Set(snapshot.map((event) => event.id));
      const subscription = this.incoming.subscribe((event) => {
        if (seen.has(event.id)) return;
        seen.add(event.id);
        subscriber.next(event);
      });
      for (const event of snapshot) subscriber.next(event);
      return () => subscription.unsubscribe();
    });
  }

  ingestMcpBody(body: unknown): void {
    const messages = Array.isArray(body) ? body : [body];
    for (const message of messages) this.ingestMessage(message);
  }

  private ingestMessage(message: unknown): void {
    if (!message || typeof message !== "object") return;
    const call = message as { method?: unknown; params?: unknown };
    if (call.method !== "tools/call" || !call.params || typeof call.params !== "object") return;

    const params = call.params as { name?: unknown; arguments?: unknown };
    if (typeof params.name !== "string" || params.name.length === 0) return;

    const args = normalizeArgs(params.arguments);
    const agent = typeof args.agent === "string" && args.agent.length > 0 ? args.agent : "agent";
    const event: TelemetryEvent = {
      id: this.nextId++,
      at: new Date().toISOString(),
      kind: params.name === "send_message" ? "message" : "tool",
      agent,
      tool: params.name,
      text: readText(args),
      arguments: args,
    };

    this.events.push(event);
    if (this.events.length > MAX_EVENTS) this.events.shift();
    this.incoming.next(event);
  }
}

function normalizeArgs(value: unknown): Record<string, unknown> {
  if (typeof value === "string") {
    try {
      return normalizeArgs(JSON.parse(value));
    } catch {
      return { text: value };
    }
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return { ...(value as Record<string, unknown>) };
}

function readText(args: Record<string, unknown>): string {
  if (typeof args.text === "string") return args.text;
  if (typeof args.message === "string") return args.message;
  return "";
}
