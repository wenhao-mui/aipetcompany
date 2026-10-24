import { Injectable } from "@nestjs/common";
import { APP_NAME } from "@aipetcompany/shared";

export type OfficeAgent = {
  id: string;
  role: string;
  status: "idle";
};

@Injectable()
export class OfficeService {
  private readonly agents: OfficeAgent[] = [
    { id: "ceo", role: "CEO", status: "idle" },
    { id: "marketing", role: "Marketing", status: "idle" },
  ];

  health() {
    return {
      status: "ok" as const,
      service: "backend",
      mcp: "/mcp",
      telemetry: "/api/telemetry",
      telemetryStream: "/api/telemetry/stream",
    };
  }

  snapshot() {
    return {
      name: APP_NAME,
      status: "open" as const,
      agents: this.agents,
    };
  }
}
