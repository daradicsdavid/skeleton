import {applyDecorators, Type} from "@nestjs/common";
import {ApiExtraModels, ApiOkResponse, getSchemaPath} from "@nestjs/swagger";
import {PageDto} from "@skeleton/common/pagination/page.dto";

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
  applyDecorators(
    ApiExtraModels(PageDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          {$ref: getSchemaPath(PageDto)},
          {
            properties: {
              data: {
                type: "array",
                items: {$ref: getSchemaPath(dataDto)}
              }
            }
          }
        ]
      }
    })
  );
