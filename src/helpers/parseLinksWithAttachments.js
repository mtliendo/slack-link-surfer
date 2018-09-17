export const parseLinksWithAttachments = (msgArr = [{ attachments: [] }]) => {
  return msgArr.map(msg => {
    const {
      text,
      title,
      fallback,
      from_url,
      original_url,
      service_name
    } = msg.attachments[0];
    return {
      title: title || text || fallback,
      service_name,
      link:
        from_url ||
        original_url ||
        "Technically not a link, but an attached goodie!"
    };
  });
};
