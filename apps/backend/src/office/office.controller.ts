import { Controller, Get } from "@nestjs/common";
import { OfficeService } from "./office.service";

@Controller("api")
export class OfficeController {
  constructor(private readonly office: OfficeService) {}

  @Get("health")
  health() {
    return this.office.health();
  }

  @Get("office")
  officeSnapshot() {
    return this.office.snapshot();
  }
}
