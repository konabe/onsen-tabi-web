export abstract class ValueObject {
  abstract equals(vo: ValueObject): boolean;
  abstract copy(): ValueObject;
}
