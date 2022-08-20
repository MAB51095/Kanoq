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

const Validate_DropDown = (val, required) => {
  if (val === null) return null;
  if (val === "") {
    if (required) return "* Mandatory";
    else return "";
  }
  return "";
};

const Validate_Currency = (val, required) => {
  if (val === null) return null;
  if (val < 0) return "Enter valid amount";
  if (required) {
    if (val == 0) return "* Mandatory";
  }
  return "";
};

const Validate_Description = (val, required) => {
  if (val === null) return null;

  if (val.length === 0) {
    if (required) return "* Mandatory";
    else return "";
  }

  return "";
};

const Validate_Date = (val, required, from, to) => {
  if (val === null) return "";
  var date = new Date(val);

  if (date == "Invalid Date") return "Enter Valid date";

  if (required) {
    if (from) {
      var fromDate = new Date(from);
      if (date < fromDate)
        return `Enter date only from ${fromDate.toISOString().split("T")[0]}`;
    }

    if (to) {
      var toDate = new Date(to);
      if (date > toDate)
        return `Enter date only upto ${toDate.toISOString().split("T")[0]}`;
    }
  }

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
  Validate_DropDown,
  Validate_Currency,
  Validate_Description,
  Validate_Date,
  AssignClass,
};

export default ValidationHelper;
