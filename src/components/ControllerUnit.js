import React from 'react';

// 控制组件
class ControllerUnit extends React.Component {
	constructor(props) {
    super(props);
		this.handleClick = this.handleClick.bind(this);
	}

  /**
   * 控制器点击函数
   */
  handleClick(e) {
		// 点击icon对应的图如果是居中状态
		if (this.props.arrange.isCenter) {
			this.props.inverse(); // 旋转
		}else {
			this.props.center(); // 居中
		}
    // 阻止默认事件
		e.stopPropagation();
		e.preventDefault();
	}

  render() {
    let controllerUnitClassName = 'controller-unit';
		// 如果图片是居中放置
		if(this.props.arrange.isCenter) {
			controllerUnitClassName += ' is-center';// 添加icon样式
		}
		// 如果图片翻转
		if (this.props.arrange.isInverse) {
			controllerUnitClassName += ' icon-inverse';// 添加icon 翻转样式
		}
    return (
      <span className={controllerUnitClassName} onClick={this.handleClick}></span>
    );
  }
}

export default ControllerUnit;
