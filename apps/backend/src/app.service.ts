import { Injectable } from "@nestjs/common";
import { hello } from "@aipetcompany/shared";

@Injectable()
export class AppService {
  getHello(): string {
    return hello("world");
  }
}
