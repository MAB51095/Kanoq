const Sort = (arr, byProp, desc) => {
  if (byProp) arr.sort(Compare(byProp, desc));
  else arr.sort();
};

function Compare(byProp, desc) {
  // converting to uppercase to have case-insensitive comparison
  const CompareByProp = (a, b) => {
    const val1 = a[byProp].toUpperCase();
    const val2 = b[byProp].toUpperCase();

    let rev = desc ? -1 : 1;
    let comparison = 0;

    if (val1 > val2) {
      comparison = 1;
    } else if (val1 < val2) {
      comparison = -1;
    }
    comparison *= rev;

    return comparison;
  };

  return CompareByProp;
}

const ArrayHelper = {
  Sort,
};

export default ArrayHelper;
