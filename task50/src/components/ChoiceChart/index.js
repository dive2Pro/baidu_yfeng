/**
 * Created by hyc on 17-3-5.
 */
import React, { Component } from "react";
import { MULTI_TYPE, TEXT_TYPE, SINGLE_TYPE } from "../../constants/topicType";
import Chart from "../Chart/Chart";
import { fromCharCode } from "../../constants/utils";
export default class ChoiceChart extends Component {

  render() {
    const { question, index, answerCount } = this.props;
    const { type, title, options } = question;
    
    let data ={};
    let chartType = "pie";
    
    if (type === SINGLE_TYPE) {
      const barData = {};
      question.options.forEach((option, i) => {
        barData[fromCharCode(65 + i)] = option.count;
      });
      data = barData;
    } else if (type === MULTI_TYPE) {
      chartType = "bar";
      const barData = [];
      options.forEach((key, i) => {
        barData.push({ xValue: fromCharCode(65 + i), yValue: key.count });
      });

      data = barData;
    } else if (type === TEXT_TYPE) {
      const count = question.contentAnswerCount;
      data = {
        有效回答: count,
        无效填写: answerCount - count
      };
    }
    return (
      <div className="choicechart">
        <div className="charttitle">
          <h3>Q{index + 1} {title}</h3>
        </div>
        <div className="chartshow">
          <div className="chartshow-message">
            {options &&
              options.map((option, i) => {
                const {title:ot,id:oid} = option;
                return (
                  <div key={oid + i}>
                    <h5>{fromCharCode(65 + i)} : {ot}</h5>
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
