const aws = require("aws-sdk");
const faker = require("faker");
const returnBatchParams = require("./utils/config").returnBatchParams;
const createNewborns = require("./utils/createNewborns").createNewborns;
const returnTrainerRequest = require("./utils/requestUtils")
  .returnTrainerRequest;

// create dynamis user ownership
// create ticket for MOCK MORPHOLOGY FUNCTION

aws.config.update({ region: "eu-west-1" });
const ddb = new aws.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = function(event, context) {
  function returnParams(newbornLimit, trainerLimit, summariesLimit) {
    let params = {
      users: [],
      generations: [],
      episodes: [],
      newborns: [],
      summaries: [],
      models: [],
      trainers: []
    };
    const userId = "37fd2f0b-1fc2-47c9-9bc5-5013798db609";

    // create user
    params.users.push({
      PutRequest: {
        Item: {
          id: { S: userId },
          userName: { S: faker.name.findName() },
          profileImage: { S: faker.image.avatar() }
        }
      }
    });

    for (var y = 0; y <= trainerLimit; y++) {
      params.trainers.push(returnTrainerRequest(userId));
    }

    params = createNewborns(params, newbornLimit, summariesLimit, userId);

    return params;
  }

  const tableParam = returnParams(30, 1, 40);

  var batchParams = returnBatchParams(tableParam);

  try {
    batchParams.forEach(function(params) {
      ddb.batchWriteItem(params, function(err, data) {
        if (err) {
          return err;
        } else {
          console.log("Success", data);
        }
      });
      return "success";
    });
  } catch (err) {
    return err;
  }
};
