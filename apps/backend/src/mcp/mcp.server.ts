import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { OfficeService } from "../office/office.service";

export function createOfficeMcpServer(office: OfficeService): McpServer {
  const server = new McpServer({
    name: "aipetcompany",
    version: "0.0.0",
  });

  server.registerTool(
    "ping",
    {
      title: "Ping",
      description: "Check that the office MCP server is reachable.",
      inputSchema: z.object({
        message: z.string().optional().describe("Optional message to echo back"),
      }),
    },
    async ({ message }) => ({
      content: [{ type: "text", text: message ? `pong: ${message}` : "pong" }],
    }),
  );

  server.registerTool(
    "send_message",
    {
      title: "Send message",
      description: "Send a message into the office. The backend keeps it and streams it on the telemetry API.",
      inputSchema: z.object({
        agent: z.string().describe("Agent id, for example ceo"),
        text: z.string().describe("Message text to show in the office"),
      }),
    },
    async ({ agent, text }) => ({
      content: [{ type: "text", text: `captured message from ${agent}: ${text}` }],
    }),
  );

  server.registerTool(
    "get_office_status",
    {
      title: "Get office status",
      description: "Return the office name, whether it is open, and the agents on the floor.",
      inputSchema: z.object({}),
    },
    async () => ({
      content: [{ type: "text", text: JSON.stringify(office.snapshot()) }],
    }),
  );

  return server;
}
