const createNewborn = require("./createNewborn").createNewborn;
const faker = require("faker");

const createNewborns = function createNewborns(
  params,
  newbornLimit,
  summariesLimit,
  userId
) {
  let generationId = faker.random.uuid();
  let childGeneration = [];
  let initGeneration = true;
  // create generation
  params.generations.push({
    PutRequest: {
      Item: {
        id: { S: generationId },
        index: { S: "0" }
      }
    }
  });
  while (childGeneration.length > 0 || initGeneration) {
    if (initGeneration) {
      initGeneration = false;
      for (var x = 0; x <= newbornLimit; x++) {
        params = createNewborn(
          params,
          summariesLimit,
          userId,
          generationId,
          x === 0 ? null : params.newborns[x - 1],
          null
        );
        if (
          !!params.newborns[params.newborns.length - 1].PutRequest.Item.partners
        ) {
          childGeneration.push([
            params.newborns[params.newborns.length - 1].PutRequest.Item.id.S,
            params.newborns[params.newborns.length - 2].PutRequest.Item.id.S
          ]);
        }
      }
    } else {
      const generation = [];
      generationId = faker.random.uuid();
      params.generations.push({
        PutRequest: {
          Item: {
            id: { S: generationId },
            index: { S: "0" }
          }
        }
      });
      childGeneration.forEach(function(gen, index) {
        params = createNewborn(
          params,
          summariesLimit,
          userId,
          generationId,
          index === 0 ? null : params.newborns[params.newborns.length - 1],
          gen
        );
        if (
          !!params.newborns[params.newborns.length - 1].PutRequest.Item.partners
        ) {
          generation.push([
            params.newborns[params.newborns.length - 1].PutRequest.Item.id.S,
            params.newborns[params.newborns.length - 2].PutRequest.Item.id.S
          ]);
        }
      });
      childGeneration = generation;
    }
  }
  return params;
};

module.exports.createNewborns = createNewborns;
