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
const DISPOSITIONS_COUNTER = "10";

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

function getInteractionStates() {
  return {
    widgetValues: {
      id: INTERACTION_STATES,
      scale: [0, 2, 4, 6, 8, 10],
      values: [0, 1, 2, 3, 4, 5, 6].map(state => ({
        id: state,
        value: getRandomInt()
      }))
    }
  };
}

function getDispositionsCounter() {
  return {
    widgetValues: {
      id: DISPOSITIONS_COUNTER,
      scale: [0, 2, 4, 6, 8, 10],
      values: [0, 1, 2, 3, 4, 5].map(state => ({
        id: state,
        value: getRandomInt()
      }))
    }
  };
}

function sendRequest() {
  const data = {
    id: "1",
    eventType: "unsubscribe",
    userId: "2",
    widgetType: "AGENT_STATES",
    widgetId: "1",
    dashboardId: "1",
    refreshInterval: 5
  };

  publish("supervision.event.request", JSON.stringify(data));
}

sendRequest();

// setInterval(function() {
//   publish(TOPIC, JSON.stringify(getAgentStates()));
//   publish(TOPIC, JSON.stringify(getInteractionStates()));
//   publish(TOPIC, JSON.stringify(getDispositionsCounter()));
//   publish(TOPIC, JSON.stringify(getAuxiliaryStates()));
// }, 10000);

//publish(TOPIC, JSON.stringify(agentStates));
//publish(TOPIC, JSON.stringify(auxiliaryStates));
//publish(TOPIC, JSON.stringify(interactionStates));
//publish(TOPIC, JSON.stringify(auxiliaryStates));
//  '{"widgetValues": {"id": "1", "scale": [0, 2, 4, 6, 8, 10], "values": [{"id": 1, "value": 2}]}}'
