/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app/app.module";
import {mainConfig} from "./app-config";
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    rawBody: true,
    bufferLogs: true,
    logger:
      process.env.ENVIRONMENT === "production"
        ? ["error", "warn"]
        : ["log", "debug", "error", "warn"]
  });
  await mainConfig(app, "", true);

  const port = process.env.PORT || 3334;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
