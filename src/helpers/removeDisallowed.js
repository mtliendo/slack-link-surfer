export default (msgs = [{}], disallowedList = [""]) => {
  return msgs.filter(msg => {
    const reggie = new RegExp(msg.service_name, "i");
    return disallowedList.some(disallowedItem => !disallowedItem.match(reggie));
  });
};
