/**
 * Created by Administrator on 2017/2/13 0013.
 */
import * as actionTypes from '../constants/index'
import * as toggleTypes from '../constants/toggleTypes'

interface Iaction {
  type: String
}
export interface ItoggleAction extends Iaction {
  toggleType: string
}

export interface IselectAction extends Iaction {

}

const toggleMonth = (): ItoggleAction => ({
  type: actionTypes.SET_TOGGLED
  , toggleType: toggleTypes.SET_MONTH
})

const toggleYear = (): ItoggleAction => ({
  type: actionTypes.SET_TOGGLED
  , toggleType: toggleTypes.SET_YEAR
})


export default ({
  toggleMonth
  , toggleYear
})
