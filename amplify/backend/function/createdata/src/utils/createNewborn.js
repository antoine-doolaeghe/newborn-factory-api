const faker = require("faker");
const returnModelRequest = require("./requestUtils").returnModelRequest;
const returnEpisodeRequest = require("./requestUtils").returnEpisodeRequest;
const returnSummaryRequest = require("./requestUtils").returnSummaryRequest;
const returnNewbornRequest = require("./requestUtils").returnNewbornRequest;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var createNewborn = function createNewborn(
  params,
  summariesLimit,
  userId,
  generationId,
  partner = null,
  parent = null
) {
  const newbornId = faker.random.uuid();
  const newbornSex = faker.random.boolean() ? "male" : "female";
  const modelId = faker.random.uuid();
  const episodeId = faker.random.uuid();
  const newbornPartner = [];
  const newbornParents = parent;
  params.models.push(returnModelRequest(modelId, newbornId));
  params.episodes.push(returnEpisodeRequest(episodeId, modelId));
  // only push summaries in 1/5 to simulate no summary episode.
  if (getRandomInt(0, 5) != 5) {
    for (var z = 0; z <= summariesLimit; z++) {
      params.summaries.push(returnSummaryRequest(episodeId, z));
    }
  }
  if (partner) {
    const partnerSex = partner.PutRequest.Item.sex.S;
    const partnerId = partner.PutRequest.Item.id.S;
    let partnerPartners = partner.PutRequest.Item.partners;
    if (partnerSex !== newbornSex) {
      newbornPartner.push(partnerId);
      if (!partnerPartners) {
        partnerPartners = { SS: [] };
      }
      partnerPartners.SS.push(newbornId);
    }
  }

  params.newborns.push(
    returnNewbornRequest(
      newbornId,
      newbornSex,
      newbornPartner,
      newbornParents,
      userId,
      generationId
    )
  );
  return params;
};

module.exports.createNewborn = createNewborn;
