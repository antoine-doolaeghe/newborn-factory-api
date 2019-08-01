const aws = require("aws-sdk");
const faker = require("faker");

aws.config.update({ region: "eu-west-1" });
const ddb = new aws.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = function(event, context) {
  function returnParams(userNum, newbornNum, trainerNum, summariesNum) {
    var params = {
      users: [],
      generations: [],
      episodes: [],
      newborns: [],
      summaries: [],
      models: [],
      trainers: []
    };
    const generationId = faker.random.uuid();
    params.generations.push({
      PutRequest: {
        Item: {
          id: { S: generationId },
          index: { S: "0" }
        }
      }
    });
    for (var i = 0; i <= userNum; i++) {
      const userId = faker.random.uuid();
      params.users.push({
        PutRequest: {
          Item: {
            id: { S: userId },
            userName: { S: faker.name.findName() },
            profileImage: { S: faker.image.avatar() }
          }
        }
      });
      for (var y = 0; y <= newbornNum; y++) {
        const newbornId = faker.random.uuid();
        const modelId = faker.random.uuid();
        const episodeId = faker.random.uuid();
        params.newborns.push({
          PutRequest: {
            Item: {
              id: { S: newbornId },
              sex: { S: "male" },
              bornPlace: { S: faker.address.country() },
              name: { S: faker.name.findName() },
              bio: { S: faker.lorem.sentences() },
              training: { BOOL: faker.random.boolean() },
              newbornOwnerId: { S: userId },
              newbornGenerationId: { S: generationId }
            }
          }
        });
        params.models.push({
          PutRequest: {
            Item: {
              id: { S: modelId },
              modelNewbornId: { S: newbornId }
            }
          }
        });
        params.episodes.push({
          PutRequest: {
            Item: {
              id: { S: episodeId },
              created: {
                S: faker.date.between("2015-01-01", "2015-12-31").toString()
              },
              episodeModelId: { S: modelId }
            }
          }
        });
        for (var z = 0; z <= summariesNum; z++) {
          params.summaries.push({
            PutRequest: {
              Item: {
                id: { S: faker.random.uuid() },
                summaryEpisodeId: { S: episodeId },
                created: {
                  S: faker.date.between("2015-01-01", "2015-12-31").toString()
                },
                meanReward: { S: faker.random.number(100).toString() },
                standardReward: { S: faker.random.number(100).toString() },
                step: { S: (z * 100).toString() }
              }
            }
          });
        }
      }
      for (var y = 0; y <= trainerNum; y++) {
        params.trainers.push({
          PutRequest: {
            Item: {
              id: { S: faker.random.uuid() },
              trainerOwnerId: { S: userId }
            }
          }
        });
      }
    }
    return params;
  }

  const tableParam = returnParams(0, 3, 0, 5);
  // create user
  var UserParams = {
    RequestItems: {
      "User-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": tableParam.users
    }
  };
  ddb.batchWriteItem(UserParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
  var GenerationParams = {
    RequestItems: {
      "Generation-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": tableParam.generations
    }
  };
  ddb.batchWriteItem(GenerationParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
  var NewbornParams = {
    RequestItems: {
      "Newborn-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": tableParam.newborns
    }
  };
  ddb.batchWriteItem(NewbornParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
  var EpisodeParams = {
    RequestItems: {
      "Episode-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": tableParam.episodes
    }
  };
  ddb.batchWriteItem(EpisodeParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
  var ModelParams = {
    RequestItems: {
      "Model-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": tableParam.models
    }
  };
  ddb.batchWriteItem(ModelParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
  var TrainerParams = {
    RequestItems: {
      "Trainer-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": tableParam.trainers
    }
  };
  ddb.batchWriteItem(TrainerParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
  var SummaryParams = {
    RequestItems: {
      "Summary-cgfnpw6cc5a3hdvevr6vfbvxlq-dev": tableParam.summaries
    }
  };
  ddb.batchWriteItem(SummaryParams, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
};
