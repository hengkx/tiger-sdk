export const paramsToString = (args: any, noLowerCase: boolean = true) => {
  let keys = Object.keys(args);
  keys = keys.sort();
  const newArgs: any = {};
  keys.forEach(key => {
    const temp = noLowerCase ? key : key.toLowerCase();
    newArgs[temp] = args[key];
  });

  let str = '';
  for (const k in newArgs) {
    /* istanbul ignore else  */
    if (newArgs.hasOwnProperty(k)) {
      str += '&' + k + '=' + newArgs[k];
    }
  }
  str = str.substr(1);
  return str;
};
