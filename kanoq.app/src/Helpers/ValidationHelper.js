const Validate_Name = (val, required) => {
  if (val === null) return null;

  if (val.length === 0) {
    if (required) return "* Mandatory";
    else return "";
  }

  let pattern = /^([a-zA-Z0-9.-\s])+$/;

  if (val.length > 100) return "Max Length 100 reached";
  if (!pattern.test(val)) return "Only alphabets & numbers allowed";

  return "";
};

const Validate_Email = (val, required) => {
  if (val === null) return null;
  if (val.length === 0) {
    if (required) return "* Mandatory";
    else return "";
  }
  let pattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/;
  if (val.length > 100) return "Max Length 100 reached";
  if (!pattern.test(val)) return "Invalid Email Format";
  return "";
};

const Validate_PhoneNumber = (val, required) => {
  if (val === null) return null;
  if (val.length === 0) {
    if (required) return "* Mandatory";
    else return "";
  }
  let pattern = /^(\d){10}$/;

  if (!pattern.test(val)) return "Invalid Number";
  return "";
};

const AssignClass = (input) => {
  if (input === null) return "";
  if (input.length > 0) return "is-invalid";
  if (input.length === 0) return "is-valid";
  return "";
};

const ValidationHelper = {
  Validate_Name,
  Validate_Email,
  Validate_PhoneNumber,
  AssignClass,
};

export default ValidationHelper;
