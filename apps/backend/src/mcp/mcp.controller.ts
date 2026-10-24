import { All, Controller, Req, Res } from "@nestjs/common";
import type { IncomingMessage, ServerResponse } from "node:http";
import { createMcpHandler } from "@modelcontextprotocol/server";
import {
  localhostHostValidation,
  localhostOriginValidation,
  toNodeHandler,
} from "@modelcontextprotocol/node";
import { OfficeService } from "../office/office.service";
import { TelemetryService } from "../telemetry/telemetry.service";
import { createOfficeMcpServer } from "./mcp.server";

type HttpRequest = IncomingMessage & { body?: unknown };

@Controller("mcp")
export class McpController {
  private readonly handle: ReturnType<typeof toNodeHandler>;
  private readonly allowHost = localhostHostValidation();
  private readonly allowOrigin = localhostOriginValidation();

  constructor(
    office: OfficeService,
    private readonly telemetry: TelemetryService,
  ) {
    const handler = createMcpHandler(() => createOfficeMcpServer(office), {
      responseMode: "json",
    });
    this.handle = toNodeHandler(handler);
  }

  @All()
  async handleRequest(@Req() req: HttpRequest, @Res() res: ServerResponse): Promise<void> {
    if (!this.allowHost(req, res) || !this.allowOrigin(req, res)) {
      return;
    }

    const body = req.method === "GET" || req.method === "DELETE" ? undefined : req.body;
    this.telemetry.ingestMcpBody(body);
    await this.handle(req, res, body);
  }
}
