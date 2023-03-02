/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  registerDecorator, ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";


@ValidatorConstraint({ name: "IsNotBlank", async: false })
export class NotBlankConstraint implements ValidatorConstraintInterface {

  public validate(value: string) {
    return value && typeof value === "string" && value.trim().length > 0;
  }

  public defaultMessage() {
    return `$property must not be empty`;
  }
}

export function IsNotBlank(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: "isNotBlank",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: NotBlankConstraint
    });
  };
}
