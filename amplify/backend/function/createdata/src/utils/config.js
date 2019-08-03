var returnBatchParams = function(params) {
  let objecttoreturn = [];
  Object.keys(params).forEach(function(key) {
    let to_return = [];
    let array = [];
    var x = 0;

    while (x <= params[key].length) {
      array.push(params[key][x]);
      if ((x % 24 === 0 && x !== 0) || x === params[key].length) {
        to_return.push(array);
        array = [];
      }
      x++;
    }
    to_return.forEach(function(entry) {
      console.log(key);
      switch (key) {
        case "users":
          objecttoreturn.push({
            RequestItems: {
              "User-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": entry
            }
          });
          break;
        case "generations":
          objecttoreturn.push({
            RequestItems: {
              "Generation-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": entry
            }
          });
          break;
        case "newborns":
          objecttoreturn.push({
            RequestItems: {
              "Newborn-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": entry
            }
          });
          break;
        case "episodes":
          objecttoreturn.push({
            RequestItems: {
              "Episode-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": entry
            }
          });
          break;
        case "models":
          objecttoreturn.push({
            RequestItems: {
              "Model-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": entry
            }
          });
          break;
        case "trainers":
          objecttoreturn.push({
            RequestItems: {
              "Trainer-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": entry
            }
          });
          break;
        case "summaries":
          objecttoreturn.push({
            RequestItems: {
              "Summary-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": entry
            }
          });
          break;

        default:
        // code
      }
    });
  });
  return objecttoreturn;
};

module.exports.returnBatchParams = returnBatchParams;
