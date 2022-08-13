const ValidationHelper = {};

const Validate_Name = (val) => {
  let pattern = /^([a-zA-Z0-9.'-\s\])+([\s\][.'-a-zA-Z0-9])*$/;

  if (val.length > 100) return "Max Length 100 reached";
  if (!pattern.test(val)) return "Only alphabets & numbers allowed";
};

const Validate_Email = (val) => {
  let pattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]+$/;

  if (!pattern.test(val)) return "Invalid Email Format";
};

const Validate_Phone = (val) => {
  let pattern = /^(\d){10}$/;

  if (!pattern.test(val)) return "Invalid Number";
};

export default ValidationHelper;
