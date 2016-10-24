require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//let yeomanImage = require('../images/yeoman.png');

// 获取图片json数据
var imageDatas = require('json!../data/imageDatas.json');

// 自执行函数 参数：imageDatas
imageDatas = (function getImageUrl(imageDatasArr) {
	for(var i = 0; i < imageDatasArr.length; i++) {
		// 单张图片数据
		var singleImageData = imageDatasArr[i];
		// 添加新属性 imageUrl 存放图片路径信息
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);


/**
 * 获取区间内的一个随机数
 */
function getRangeRandom(high, low) {
	return Math.ceil(Math.round() * (high - low) + low);
}

// 图片组件
var ImgFigure = React.createClass({
	render: function () {
		return (
			<figure className="img-figure">
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
});

var AppComponent = React.createClass({
	// 位置排布点(先设置0，0)
	Constant: {
		centerPos: {
			left: 0;
			right: 0;
		},
		// 水平方向取值范围
		hPosRange: {
			leftSecX: [0,0], // 左分区x取值
			rightSecX: [0,0], // 右分区y取值
			y: [0,0] // 左右y范围相同，故简写y
		},
		// 竖直方向取值范围
		vPosRange: {
			x: [0,0], // x取值
			topY: [0,0] // y取值
		}
	},

	/**
	 * 重新布局所有图片
	 * @param centerIndex 指定居中排布哪个图片
	 */
	rearrange: function(centerIndex) {
		var imgsArrangeArr = this.stste.imgsArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX =  hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeX = vPosRange.x,
			vPosRangeTopY = vPosRange.topY,
			
			// 放置在上方的图片
			imgsArrangeTopArr = [],
			topImgNum = Math.ceil(Math.random() * 2), // 取一个或者
			
			topImgSpliceIndex = 0,
			// 放置在中心的图片
			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1),

			// 居中 centerIndex 的图片
			imgsArrangeCenterArr[0].pos = centerPos;

			// 取出要布局上侧的图片状态信息
			topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

			// 布局位于上侧的图片
			imgsArrangeTopArr.forEach(function(value,index) {
				imgsArrangeTopArr[index].pos = {
					left: getRangeRandom(vPosRangeX[0],vPosRangeX[1]),
					top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])
				}
			});

			// 布局位于左右侧的图片
			for(var i = 0 , j = imgsArrangeArr.length , k = j / 2; i < j; i++) {
				var hPosRangeLOR_X = null;
				if (i < k) {
					hPosRangeLOR_X = hPosRangeLeftSecX; // 小于一半默认放左边
				}else {
					hPosRangeLOR_X = hPosRangeRightSecX // 大于一半默认放右边
				}

				imgsArrangeArr[i].pos = {
					left: getRangeRandom(hPosRangeLOR_X[0],hPosRangeLOR_X[1]),
					top: getRangeRandom(hPosRangeY[0],hPosRangeY[1])
				}
			}
			
			// 重新插入之前放置在上侧的图片到数组中
			if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
				imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
			}
			// 重新插入之前放置在中心的图片到数组中
			imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
			
			// 重新渲染
			this.setState({
				imgsArrangeArr : imgsArrangeArr
			});
	},

	// react初始化状态
	getInitialStage: function() {
		return {
			imgsArrangeArr: [
				// {
				// 	pos: {
				// 		left: '0';
				// 		top: '0';
				// 	}	
				// }
			]
		};
	},
	
	//组件加载后，计算每张图片其可以放置的范围
	componentDidMount: function() {
		// 拿到舞台的大小
		var stageDOM = React.findDOMNode(this.refs.stage),
			stageW = stageDOM.scrollWidth, // 舞台宽度
			stageH = stageDOM.scrollHeight, // 舞台高度
			halfStageW = Math.ceil(stageW / 2), 
			halfStageH = Math.ceil(stageH / 2); 
		
		// 拿到一个imgFigure组件的大小
		var ImgFigureDOM = React.findDOMNode(this.refs.imgFigure0), // 相同大小，取一个即可
			imgW = ImgFigureDOM.scrollWidth, // img组件宽度
			imgH = ImgFigureDOM.scrollHeight, // img组件高度
			halfImgW = Math.ceil(imgW / 2), 
			halfImgH = Math.ceil(imgH / 2);

		// 计算中心图片位置
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfImgH - halfImgH
		}

		// 水平左选区范围X
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
		// 水平右选区范围X
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		
		// 水平左右选区Y
		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;
		
		// 垂直选区X
		this.Constant.vPosRange.x[0] = halfStageW - halfImgW; 
		this.Constant.vPosRange.x[1] = halfStageW;
		// 垂直选区Y
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
		
		// 执行居中排布
		this.rearrange(0);
	},

 	render: function() {
	    var controllerUnits = [],
	        imgFigures = [];

	    imageDatas.forEach(function(value,index) {
			
			if (!this.state.imgsArrangeArr[index]) {
				// 初始化当前组件位置
				this.state.imgsArrangeArr[index] = {
					pos:{
						left: 0,
						top: 0
					}
				};
			}	

	      	imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]}/>);
	    }.bind(this));

	    return (
	      <section className="stage" ref="stage" >
	        <section className="img-sec">
	          {imgFigures}
	        </section>
	        <nav className="controller-nav">
	          {controllerUnits}
	        </nav>
	      </section>
	    );
	}
});

// class AppComponent extends React.Component {
//   render() {
	
  	// var controllerUnits = [],
  	// 	imgFigures = [];

  	// imageDatas.forEach(function(value) {
  	// 	// 存放ImgFigure组件
  	// 	imgFigures.push(<ImgFigure data={value}/>);
  	// });


//     return (
//     	// 舞台
//     	<section clasName="stage">
//     		<section className="img-sec">\
//     		</section>
//     		<nav clasName="controller-nav">
//     		</nav>
//     	</section>
//     );
//   }
// }

AppComponent.defaultProps = {
};

export default AppComponent;