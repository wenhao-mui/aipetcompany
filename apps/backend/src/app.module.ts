import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { McpController } from "./mcp/mcp.controller";
import { OfficeController } from "./office/office.controller";
import { OfficeService } from "./office/office.service";
import { TelemetryController } from "./telemetry/telemetry.controller";
import { TelemetryService } from "./telemetry/telemetry.service";

@Module({
  controllers: [AppController, OfficeController, McpController, TelemetryController],
  providers: [AppService, OfficeService, TelemetryService],
})
export class AppModule {}
