import { useSelector } from "react-redux";


const LOAD = 'servers/LOAD';
const ADD_ONE = 'servers/ADD_ONE';
// const DELETE_ONE = 'servers/DELETE_ONE'
// const EDIT_ONE = 'servers/EDIT_ONE'

const load = serversArray => ({
    type: LOAD,
    serversArray
})

const addOneServer = server => ({
    type: ADD_ONE,
    server
})

export const getServers = () => async dispatch => {

    const response = await fetch(`/api/channels`)

    if (response.ok) {
        const serversArray = await response.json()
        // console.log("SERVERSARRAY:",serversArray)
        dispatch(load(serversArray))
    }
}

// export const createServer


const initialState = {};

const serversReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state
        case LOAD:
            const servers = {}
            // console.log("ACTION", action.serversArray)
            // TODO Make sure this is an array
            // console.log()
            const serversArray = action.serversArray
            console.log('serversARRAY',serversArray)
            action.serversArray.forEach(server => {
                // console.log('SERVER.ID', server.serverId)
                servers[server.serverId] = server
            });
            // console.log('THUNK SERVER', servers)
            return {
                ...state, servers, serversArray
            }
    }
}

export default serversReducer
