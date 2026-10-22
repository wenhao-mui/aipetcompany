import { Controller, Get } from "@nestjs/common";
import { joinOffice } from "@aipetcompany/agent-sdk";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return {
      message: this.appService.getHello(),
      office: joinOffice("founder"),
    };
  }
}
