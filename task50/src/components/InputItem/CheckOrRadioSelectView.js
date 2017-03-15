 import { Radio, Checkbox } from "antd";
import React from "react";
export default class CheckOrRadioSelectView extends React.Component {
  render() {
    const { checkbox, onHandleChange,index } = this.props;
    console.log(onHandleChange);
    const Element = checkbox ? Checkbox : Radio;
    return (
      <Element
        name="Temp_Does_matter"
        onChange={() => onHandleChange(index)} 
        {...this.props}
      />
    );
  }   
  static propTypes = {
    onHandleChange: React.PropTypes.func.isRequired
  };
}
