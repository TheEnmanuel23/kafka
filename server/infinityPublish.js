const publish = require("./producer");

const TOPIC = "supervision.event.response";

const getRandomInt = () => {
  const min = 0;
  const max = 10;
  return Math.floor(Math.random() * (max - min)) + min;
};

const AGENT_STATES = "1";
const AUXILIARY_STATES = "2";
const INTERACTION_STATES = "3";

const agentStates = {
  widgetValues: {
    id: AGENT_STATES,
    scale: [0, 2, 4, 6, 8, 10],
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(state => ({
      id: state,
      value: getRandomInt()
    }))
  }
};

const auxiliaryStates = {
  widgetValues: {
    id: AUXILIARY_STATES,
    scale: [0, 2, 4, 6, 8, 10],
    values: [0, 1, 2, 3, 4, 5].map(state => ({
      id: state,
      value: getRandomInt()
    }))
  }
};

const interactionStates = {
  widgetValues: {
    id: INTERACTION_STATES,
    scale: [0, 2, 4, 6, 8, 10],
    values: [0, 1, 2, 3, 4, 5, 6].map(state => ({
      id: state,
      value: getRandomInt()
    }))
  }
};

function getAgentStates() {
  return {
    widgetValues: {
      id: AGENT_STATES,
      scale: [0, 2, 4, 6, 8, 10],
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(state => ({
        id: state,
        value: getRandomInt()
      }))
    }
  };
}

function getAuxiliaryStates() {
  return {
    widgetValues: {
      id: AUXILIARY_STATES,
      scale: [0, 2, 4, 6, 8, 10],
      values: [0, 1, 2, 3, 4, 5].map(state => ({
        id: state,
        value: getRandomInt()
      }))
    }
  };
}

setInterval(function() {
  publish(TOPIC, JSON.stringify(getAgentStates()));
  publish(TOPIC, JSON.stringify(getAuxiliaryStates()));
}, 3000);

//publish(TOPIC, JSON.stringify(agentStates));
//publish(TOPIC, JSON.stringify(auxiliaryStates));
//publish(TOPIC, JSON.stringify(interactionStates));
//publish(TOPIC, JSON.stringify(auxiliaryStates));
//  '{"widgetValues": {"id": "1", "scale": [0, 2, 4, 6, 8, 10], "values": [{"id": 1, "value": 2}]}}'
