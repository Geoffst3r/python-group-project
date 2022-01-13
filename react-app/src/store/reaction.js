// constants
const GET_REACTIONS = '/channels/getAllChannels'
const ADD_REACTION = 'channels/addChannel'

const get_Reactions = (reactions) => {
  return {
    type: GET_REACTIONS,
    reactions
  }
}

const add_Reaction = (reaction) => {
  return {
    type: ADD_REACTION,
    reaction
  }
}

export const getReactions = (messageId) => async (dispatch) => {
  if (!messageId) return;
  const res = await fetch(`/api/reactions/${messageId}/`);
  if (res.ok) {
    const reactions = await res.json();
    dispatch(get_Reactions(reactions));
    return reactions;
  };
};

export const addReaction = (inputReaction) => async (dispatch) => {
  const { messageId, userId, reaction } = inputReaction;
  const res = await fetch(`/api/reactions/${messageId}/`, {
    method: 'POST',
    body: JSON.stringify({
        messageId, userId, reaction
    })
  });
  if (res.ok) {
    const outputReaction = await res.json();
    if (outputReaction !== "bad data") {
      dispatch(add_Reaction(outputReaction));
    }
    return outputReaction;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};

const reactionReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_REACTIONS:
      action.reactions.forEach(reaction => {
        if (newState[reaction.messageId]) {
          newState[reaction.messageId] = {...newState[reaction.messageId], reaction}
        } else newState[reaction.messageId] = reaction;
      });
      return newState;
    case ADD_REACTION:
      newState = Object.assign({}, state);
      newState[action.reaction.messageId] = action.reaction;
      return newState;
    default:
      return state;
  }
};

export default reactionReducer;