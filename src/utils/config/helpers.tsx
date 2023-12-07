export function getControl(item: any) {
  const isControl = item instanceof HTMLInputElement;

  if (!isControl || item == null) return null;

  return item;
}

export const emailPatternValidation = (email: any) => {
  //  '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
  // '/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/'
  const regex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
  return regex.test(email);
};

export function capitalizeFirstLetter(props: string) {
  return (
    props &&
    props
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))
  );
}
