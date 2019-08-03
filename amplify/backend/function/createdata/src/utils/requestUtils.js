const faker = require("faker");

var returnNewbornRequest = function returnNewbornRequest(
  newbornId,
  newbornSex,
  newbornPartners,
  newbornParents,
  userId,
  generationId
) {
  return {
    PutRequest: {
      Item: {
        id: { S: newbornId },
        sex: { S: newbornSex },
        bornPlace: { S: faker.address.country() },
        name: { S: faker.name.findName() },
        bio: { S: faker.lorem.sentences() },
        training: { BOOL: faker.random.boolean() },
        newbornOwnerId: { S: userId },
        newbornGenerationId: { S: generationId },
        partners: newbornPartners.length ? { SS: newbornPartners } : null,
        parents: newbornParents ? { SS: newbornParents } : null
      }
    }
  };
};

var returnModelRequest = function returnModelRequest(modelId, newbornId) {
  return {
    PutRequest: {
      Item: {
        id: { S: modelId },
        modelNewbornId: { S: newbornId }
      }
    }
  };
};

var returnEpisodeRequest = function returnEpisodeRequest(episodeId, modelId) {
  return {
    PutRequest: {
      Item: {
        id: { S: episodeId },
        created: {
          S: faker.date.between("2015-01-01", "2015-12-31").toString()
        },
        episodeModelId: { S: modelId }
      }
    }
  };
};

var returnSummaryRequest = function returnSummaryRequest(episodeId, index) {
  return {
    PutRequest: {
      Item: {
        id: { S: faker.random.uuid() },
        summaryEpisodeId: { S: episodeId },
        created: {
          S: faker.date.between("2015-01-01", "2015-12-31").toString()
        },
        meanReward: { S: faker.random.number(100).toString() },
        standardReward: { S: faker.random.number(100).toString() },
        step: { S: (index * 100).toString() }
      }
    }
  };
};

var returnTrainerRequest = function returnTrainerRequest(userId) {
  return {
    PutRequest: {
      Item: {
        id: { S: faker.random.uuid() },
        trainerOwnerId: { S: userId }
      }
    }
  };
};

module.exports.returnNewbornRequest = returnNewbornRequest;
module.exports.returnModelRequest = returnModelRequest;
module.exports.returnEpisodeRequest = returnEpisodeRequest;
module.exports.returnSummaryRequest = returnSummaryRequest;
module.exports.returnTrainerRequest = returnTrainerRequest;
