/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app/app.module";
import {mainConfig} from "./app-config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bufferLogs: true,
    logger:
      process.env.ENVIRONMENT === "production"
        ? ["error", "warn"]
        : ["log", "debug", "error", "warn"]
  });
  const globalPrefix = "public-api";
  mainConfig(app, globalPrefix, true);

  const port = process.env.PORT || 3334;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
