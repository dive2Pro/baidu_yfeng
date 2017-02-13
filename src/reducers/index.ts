import { combineReducers } from 'redux'
import * as actionTypes from '../constants/index'
import { ItoggleAction } from '../actions/actionCreator'

interface defaultState {

}

export interface toggleDefaultState extends defaultState {

}


export interface selectDefaultState extends defaultState {

}

const setToggled = (state: toggleDefaultState, toggleType: string) => {
  const toggleObject = {}
  toggleObject[toggleType] = !state[toggleType]
  return Object.assign({}, state, toggleObject)
}

function toggle(state: toggleDefaultState = {}, action: ItoggleAction) {
  switch (action.type) {
    case actionTypes.SET_TOGGLED:
      return setToggled(state, action.toggleType)
    default:
      return state
  }
}

function select(state: selectDefaultState = {}, action: any) {
  switch (action.type) {
    case actionTypes.BTN_GO_BACK:
      return
    case actionTypes.BTN_GO_FORWORD:
      return
    default:
      return state
  }
}

export default combineReducers({
  toggle
  , select
})

