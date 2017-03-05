/**
 * Created by hyc on 17-3-5.
 */
import React, { Component } from "react";
import { MULTI_TYPE, TEXT_TYPE, SINGLE_TYPE } from "../../constants/topicType";
import Chart from "../Chart/Chart";
import { fromCharCode } from "../../constants/utils";
export default class ChoiceChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { question, message, answer, index, answerCount } = this.props;
    const { type, titleId, optionsId } = question;

    let data = answer;
    let chartType = "pie";
    if (type === SINGLE_TYPE) {
      const barData = {};
      Object.keys(answer).forEach((key, i) => {
        barData[fromCharCode(65 + i)] = answer[key];
      });
      data = barData;
    } else if (type === MULTI_TYPE) {
      chartType = "bar";
      const barData = [];
      Object.keys(answer).forEach((key, i) => {
        barData.push({ xValue: fromCharCode(65 + i), yValue: answer[key] });
      });

      data = barData;
    } else if (type === TEXT_TYPE) {
      const key = Object.keys(answer)[0];
      data = {
        有效回答: answer[key],
        无效填写: answerCount - answer[key]
      };
    }
    return (
      <div className="choicechart">
        <div className="charttitle">
          <h3>Q{index + 1} {message[titleId]}</h3>
        </div>
        <div className="chartshow">
          <div className="chartshow-message">
            {optionsId.map &&
              optionsId.map((id, i) => {
                return (
                  <div key={id + i}>
                    <h5>{fromCharCode(65 + i)} : {message[id]}</h5>
                  </div>
                );
              })}
          </div>
          <Chart
            type={chartType}
            width={300}
            height={200}
            showTooltips={true}
            data={data}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          />
        </div>
      </div>
    );
  }
}
