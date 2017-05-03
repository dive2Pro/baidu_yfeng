/**
 * Created by hyc on 17-3-5.
 */
import React, { Component } from 'react';
import { MULTI_TYPE, TEXT_TYPE, SINGLE_TYPE } from '../../constants/topicType';
import Chart from '../Chart/Chart';
import { fromCharCode } from '../../constants/utils';
import { observer } from 'mobx-react';

@observer
export default class ChoiceChart extends Component {
  render() {
    let { question, answer, index } = this.props;
    const { type, title, options, id: qid } = question;
    if (!answer) {
      return <div>{title} 暂时没有答题信息</div>;
    }
    const { answerCount } = answer;
    console.log(answer);
    let data = {};
    let chartType = 'pie';
    let isText = type === TEXT_TYPE;
    if (type === SINGLE_TYPE) {
      const barData = {};
      Object.keys(answer).forEach((key, i) => {
        barData[fromCharCode(65 + i)] = answer[key];
      });
      data = barData;
    } else if (type === MULTI_TYPE) {
      chartType = 'bar';
      const barData = [];
      Object.keys(answer).forEach((key, i) => {
        barData.push({ xValue: fromCharCode(65 + i), yValue: answer[key] });
      });

      data = barData;
    } else if (isText) {
      data = {
        有效回答: answer[qid],
        无效填写: answerCount - answer[qid]
      };
      console.log(data, answer);
    }
    return (
      <div className="choicechart">
        <div className="charttitle">
          <h3>Q{index + 1} {title}</h3>
        </div>
        <div className="chartshow">
          <div className="chartshow-message">
            {!isText &&
              options &&
              options.map((option, i) => {
                const { id, title } = option;
                return (
                  <div key={id + i}>
                    <h5>{fromCharCode(65 + i)} : {title}</h5>
                  </div>
                );
              })}
          </div>
          <Chart
            type={chartType}
            width={300}
            height={isText ? 220 : 200}
            showTooltips={true}
            data={data}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          />
        </div>
      </div>
    );
  }
}
