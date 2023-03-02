import { applyDecorators, Controller as NestJSController } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

export function Controller(name: string) {
  return applyDecorators(
    NestJSController(name),
    ApiTags(name)
  );
}
