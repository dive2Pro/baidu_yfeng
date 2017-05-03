/**
 * Created by hyc on 17-3-11.
 */
import { Radio, Checkbox } from 'antd';
import React from 'react';
export default class CheckOrRadioSelectView extends React.Component {
  render() {
    const { checkbox, id, onHandleChange } = this.props;
    const Element = checkbox ? Checkbox : Radio;
    return <Element name="Temp_Does_matter" {...this.props} />;
  }
  static propTypes = {
    onHandleChange: React.PropTypes.func.isRequired
  };
}
