export const CreateErrorNotification = (error, page, action) => {
  var item = {
    id: new Date()[Symbol.toPrimitive]("number"),
    bg: "danger",
    Page: `${page} - page.`,
    Action: `${action} - failed.`,
    Message: error.response.data.Message,
  };

  return item;
};

export const CreateSuccessNotification = (message, page, action) => {
  var item = {
    id: new Date()[Symbol.toPrimitive]("number"),
    bg: "success",
    Page: `${page} - page.`,
    Action: `${action} - Success.`,
    Message: message,
  };

  return item;
};
