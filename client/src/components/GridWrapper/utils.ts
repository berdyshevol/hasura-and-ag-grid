export const convertPropertyToArray =
  <TData, TProperty extends keyof TData>(property: TProperty) =>
  (
    obj: TData,
  ): TData & {
    [property: string]: TData[TProperty][];
  } => ({
    ...obj,
    [property]: [obj[property]],
  });

export const preparePayload = <TData, TProperty extends keyof TData>(
  array: TData[] | undefined,
  property: TProperty,
) => {
  if (array === undefined) return [];
  return array.map(convertPropertyToArray<TData, TProperty>(property));
};
