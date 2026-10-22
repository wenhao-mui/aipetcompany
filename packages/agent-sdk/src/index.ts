import { APP_NAME, hello } from "@aipetcompany/shared";

export function joinOffice(agentName: string): string {
  return `${hello(agentName)} Joining the ${APP_NAME} office.`;
}
