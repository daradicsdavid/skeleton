import {Logger, RequestMethod, ValidationPipe} from "@nestjs/common";
import {Logger as PinoLogger} from "nestjs-pino/Logger";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import fs from "fs";
import {execSync} from "child_process";
import {NestFastifyApplication} from "@nestjs/platform-fastify";
import fastifyCookie from "@fastify/cookie";

export async function mainConfig(app: NestFastifyApplication, globalPrefix: string, enableClientGeneration: boolean) {
  await app.register(fastifyCookie);
  app.setGlobalPrefix(globalPrefix, {
    exclude: [{path: "health", method: RequestMethod.GET}]
  });

  app.enableCors({
    origin: [process.env.CLIENT_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Accept",
    credentials: true
  });
  Logger.log(`CORS enabled for: ${process.env.WEBAPP_URL}!`);

  if (process.env.ENVIRONMENT === "local") {
    app.useLogger(app.get(PinoLogger));
  }
  app.useGlobalPipes(new ValidationPipe());

  const allowedMethods = ["GET", "HEAD", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"];

  app.use((req, res, next) => {
    if (!allowedMethods.includes(req.method)) return res.end(405, "Method Not Allowed");
    return next();
  });

  if (enableClientGeneration) {
    const config = new DocumentBuilder()
      .setTitle("api")
      .setDescription("API docs")
      .setVersion("1.0")
      .addTag("public")
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
    });
    SwaggerModule.setup("api-docs", app, document);
    if (process.env.ENVIRONMENT === "local") {
      const openApiDescriptionPath = "libs/api-client/generated-api-docs.json";
      const frontendApiOutputPath = "libs/api-client/src";
      Logger.log("Generating api client");
      fs.writeFileSync(openApiDescriptionPath, JSON.stringify(document));
      execSync(
        `npx @openapitools/openapi-generator-cli generate -i ${openApiDescriptionPath} -g typescript-axios  -o ${frontendApiOutputPath}  --type-mappings=DateTime=Date --additional-properties=supportsES6=true`
      );
    }
  }
}
