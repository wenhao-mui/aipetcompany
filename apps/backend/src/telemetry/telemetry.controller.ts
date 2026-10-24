import { Controller, Get, MessageEvent, Sse } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { TelemetryService } from "./telemetry.service";

@Controller("api/telemetry")
export class TelemetryController {
  constructor(private readonly telemetry: TelemetryService) {}

  @Get()
  list() {
    return { events: this.telemetry.list() };
  }

  @Sse("stream")
  stream(): Observable<MessageEvent> {
    return this.telemetry.watch().pipe(map((event) => ({ data: event })));
  }
}
