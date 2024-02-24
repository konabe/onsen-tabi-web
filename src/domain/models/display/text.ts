export const text = (
  omittable: OmittableText,
  isOmitted: boolean
): string | undefined => {
  return isOmitted ? omittable.getOmittedText() : omittable.getText();
};
