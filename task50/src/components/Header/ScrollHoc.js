/**
 * Created by hyc on 17-3-10.
 */
import React from "react";
export default function ScrollHoc(Component) {
  class Scroll extends React.Component {
    state = {};
    handleScroll = e => {
      if (window.pageYOffset > 30) {
        this.setState({ overScroll40: true });
      } else {
        this.setState({ overScroll40: false });
      }
    };
    componentDidMount() {
      window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }

    render() {
      const overScroll40 = this.state.overScroll40;
      return <Component overScroll40={overScroll40} {...this.props} />;
    }
  }
  return Scroll;
}
