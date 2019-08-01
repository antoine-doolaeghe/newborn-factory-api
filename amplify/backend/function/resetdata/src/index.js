const aws = require("aws-sdk");

aws.config.update({ region: "eu-west-1" });
const ddb = new aws.DynamoDB.DocumentClient();

const tablesConfig = [
  {
    TableName: "Newborn-cgfnpw6cc5a3hdvevr6vfbvxlq-dev"
  },
  {
    TableName: "Model-cgfnpw6cc5a3hdvevr6vfbvxlq-dev"
  },
  {
    TableName: "Generation-cgfnpw6cc5a3hdvevr6vfbvxlq-dev"
  },
  {
    TableName: "Episode-cgfnpw6cc5a3hdvevr6vfbvxlq-dev"
  },
  {
    TableName: "Prediction-cgfnpw6cc5a3hdvevr6vfbvxlq-dev"
  },
  {
    TableName: "Summary-cgfnpw6cc5a3hdvevr6vfbvxlq-dev"
  },
  {
    TableName: "Trainer-cgfnpw6cc5a3hdvevr6vfbvxlq-dev"
  },
  {
    TableName: "User-cgfnpw6cc5a3hdvevr6vfbvxlq-dev"
  }
];

exports.handler = function(event, context) {
  var hashKey = "id";
  var rangeKey = null;

  function scanTable(param) {
    ddb.scan(param, function(err, data) {
      if (err) return err;
      else {
        data.Items.forEach(function(obj, i) {
          var params = {
            TableName: param.TableName,
            Key: buildKey(obj),
            ReturnValues: "NONE",
            ReturnConsumedCapacity: "NONE",
            ReturnItemCollectionMetrics: "NONE"
          };

          ddb.delete(params, function(err, data) {
            if (err) return err;
            else return data;
          });
        });
      }
    });
  }

  function buildKey(obj) {
    var key = {};
    key[hashKey] = obj[hashKey];
    if (rangeKey) {
      key[rangeKey] = obj[rangeKey];
    }

    return key;
  }

  try {
    tablesConfig.forEach(param => {
      scanTable(param);
    });
  } catch (err) {
    return err;
  }
};
