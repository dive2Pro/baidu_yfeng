import * as React from 'react'
import { connect } from 'react-redux'
import actions from '../actions/actionCreator'
import { bindActionCreators } from 'redux'
class DateHeader extends React.Component<any, any>{

  render() {
    const {goBack} = this.props

    return (
      <div className="date-header">
        <div className="date-header-back"
         >
          <i>{`<`}</i>
        </div>
        <div>
          <input type="text" />
          <i  onClick={() => goBack}>
            $
        </i>
        </div>
        <div>
          <input type="text" />
          <i>
            $
        </i>
        </div>
        <div className="date-header-foward">
          <i>></i>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state: any) {
  console.info(state)
  return state
}

function mapDispatchToProps(state: any, dispatch: any) {
  return {
    goBack: bindActionCreators(actions.toggleMonth, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateHeader)
