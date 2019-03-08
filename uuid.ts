/**
 * Generates an universally unique identifier compliant with RFC 4122 v4
 */
export function uuid(): string {
  /* tslint:disable */
  const template = [1e7] as any +-1e3+-4e3+-8e3+-1e11;
  const randomValues = crypto.getRandomValues(new Uint8Array(template.length));

  return template.replace(/[018]/g, (c, i) =>
    (c ^ randomValues[i] & 15 >> c / 4).toString(16)
  );
}
