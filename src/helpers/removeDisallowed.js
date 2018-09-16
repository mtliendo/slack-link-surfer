export const removeDisallowed = (msgs = [], disallowedList = []) => {
  return msgs.filter(msg => {
    const reggie = new RegExp(msg, "ig");
    disallowedList.every(disallowedItem => !!disallowedItem.match(reggie)[0]);
  });
};
