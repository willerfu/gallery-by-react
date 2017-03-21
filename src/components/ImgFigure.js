import React from 'react';

// 图片组件
class ImgFigure extends React.Component {
	constructor(props) {
    super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	/**
	 * 图片点击翻转
	 */
	handleClick(e) {
		// 判断点击的图片是否居中显示
		if (this.props.arrange.isCenter) {
			this.props.inverse(); // 调用翻转函数
		}else {
			this.props.center(); // 调用居中函数
		}
		// 阻止默认事件
		e.stopPropagation();
		e.preventDefault();
	}

	render() {
		// 样式位置
		let styleObj = {};
		// 如果props属性中指定了这张图片的位置，则使用
		if (this.props.arrange.pos) {
			styleObj = {
				left: this.props.arrange.pos.left + 'px',
				top: this.props.arrange.pos.top + 'px'
			};
		}
		// 如果图片的旋转角度有值且不为0，则添加旋转角度
		if (this.props.arrange.rotate) {
			(['MzoTransform','msTransform','WebkitTransform','transform']).forEach(value => {
				styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			});
		}
		// 如果图片居中，设置其z-index值11，防止其他图片遮盖
		if (this.props.arrange.isCenter) {
			styleObj['zIndex'] = 11;
		}
		let imgFigureClassName = 'img-figure';
		// 如果图片反转状态true 追加is-inverse
    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : ''; // 追加class 注意空格

		return (
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back" onClick={this.handleClick}>
						<p>{this.props.data.desc}</p>
					</div>
				</figcaption>
			</figure>
		);
	}
}

export default ImgFigure;
