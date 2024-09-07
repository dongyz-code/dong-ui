export const getValueFromEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { target } = e;
  if (target.type === 'checkbox') {
    return target.checked;
  } else if (target.type === 'number') {
    return Number(target.value);
  } else if (target.type === 'radio') {
    return target.value;
  } else {
    return target.value;
  }
};
