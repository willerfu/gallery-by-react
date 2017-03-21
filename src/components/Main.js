import 'normalize.css/normalize.css';
import 'styles/App.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './ImgFigure'
import ControllerUnit from './ControllerUnit'


// 获取图片json数据
let imageDatas = require('../data/imageDatas.json');

// 自执行函数 参数：imageDatas
imageDatas = ((imageDatasArr) => {
	for(let i = 0,j = imageDatasArr.length; i < j ; i++) {
		// 单张图片数据
		let singleImageData = imageDatasArr[i];
		// 添加新属性 imageUrl 存放图片路径信息
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);

/**
 * 获取区间内的一个随机数
 */
const getRangeRandom  = (low, high) =>
	Math.floor(Math.random() * (high - low) + low);// ceil 巨坑

/*
 * 获取 0~30° 之间的一个任意正负值
 */
const get30DegRandom = () =>
	((Math.random() > 0.5 ? '' : '-') + Math.floor(Math.random() * 30));

// App组件
class AppComponent extends React.Component {
	constructor(props) {
    super(props);
		// 初始化state
    this.state = {
			imgsArrangeArr: [
        /*{
          	pos:{
           		left:'0',
           		top:'0'
         },
         	rotate: rotate(30deg),
         	isInverse: false,
         	isCenter: false
        }*/
	     ]
		 };

		 // 位置排布点(先设置0，0)
	 	this.Constant = {
	 		centerPos: {
	 			left: 0,
	 			right: 0
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
	 	}
	}

	/**
	 * 翻转图片
	 * index 当前需要执行翻转的图片数组里的index值
	 */
	 inverse = (index) => () => {
 			let imgsArrangeArr = this.state.imgsArrangeArr;
 			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse; // 取反 true
 			// 更新
 			this.setState({
 				imgsArrangeArr: imgsArrangeArr
 			});
 	}

	/**
	 * 重新布局所有图片
	 * centerIndex 指定居中排布哪个图片
	 */
	  rearrange = (centerIndex) => {
 		let imgsArrangeArr = this.state.imgsArrangeArr,
 			Constant = this.Constant,
 			centerPos = Constant.centerPos,
 			hPosRange = Constant.hPosRange,
 			vPosRange = Constant.vPosRange,
 			hPosRangeLeftSecX =  hPosRange.leftSecX, // 水平左区x
 			hPosRangeRightSecX = hPosRange.rightSecX, // 水平右区x
 			hPosRangeY = hPosRange.y, // 水平y
 			vPosRangeX = vPosRange.x,
 			vPosRangeTopY = vPosRange.topY,

 			// 放置在上方的图片
 			imgsArrangeTopArr = [],
 			topImgNum = Math.floor(Math.random() * 2), // 取1个或者0个

 			topImgSpliceIndex = 0,
 			// 放置在中心的图片
 			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

 			// 居中 centerIndex 的图片
 			imgsArrangeCenterArr[0] = {
 				pos: centerPos,
 				rotate: 0, // 居中图片不需要旋转
 				isInverse: false,
 				isCenter: true
 			};

 			// 取出要布局上侧的图片状态信息
 			topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
 			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

 			// 布局位于上侧的图片
 			imgsArrangeTopArr.forEach((value,index) => {
 				imgsArrangeTopArr[index] = {
 					pos: {
 						left: getRangeRandom(vPosRangeX[0],vPosRangeX[1]),
 						top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])
 					},
 					rotate: get30DegRandom(), // 随机旋转
 					isInverse: false,
 					isCenter: false
 				};
 			});

 			// 布局位于左右侧的图片
 			for(let i = 0 ,j = imgsArrangeArr.length,k = j / 2; i < j; i++) {
 				let hPosRangeLOR_X = null;

 				if (i < k) {
 					hPosRangeLOR_X = hPosRangeLeftSecX; // 小于一半默认放左边
 				}else {
 					hPosRangeLOR_X = hPosRangeRightSecX;// 大于一半默认放右边
 				}

 				imgsArrangeArr[i] = {
 					pos: {
 						left: getRangeRandom(hPosRangeLOR_X[0],hPosRangeLOR_X[1]),
 						top: getRangeRandom(hPosRangeY[0],hPosRangeY[1])
 					},
 					rotate: get30DegRandom(), // 随机旋转
 					isInverse: false,
 					isCenter: false
 				};
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
 	}

	/**
	 * 居中对应的index图片
	 * index 被居中的图片在图片数组里的index值
	 */
	 center = (index) => () => {
 			this.rearrange(index);
 	 }

	//组件加载后，计算每张图片其可以放置的范围
	componentDidMount(){
		// 拿到舞台的大小
		let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
			stageW = stageDOM.scrollWidth, // 舞台宽度
			stageH = stageDOM.scrollHeight, // 舞台高度
			halfStageW = Math.floor(stageW / 2),
			halfStageH = Math.floor(stageH / 2);

		// 拿到一个imgFigure组件的大小
		let ImgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0), // 相同大小，取一个即可
			imgW = ImgFigureDOM.scrollWidth, // img组件宽度
			imgH = ImgFigureDOM.scrollHeight, // img组件高度
			halfImgW = Math.floor(imgW / 2),
			halfImgH = Math.floor(imgH / 2);

		// 计算中心图片位置
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		};

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
		this.Constant.vPosRange.x[0] = halfStageW - imgW;
		this.Constant.vPosRange.x[1] = halfStageW;
		// 垂直选区Y
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
		// 执行居中排布

    	this.rearrange(0);
	}

 	render() {
	    let controllerUnits = [],
	        imgFigures = [];

	    imageDatas.forEach((value,index) => {
				if (!this.state.imgsArrangeArr[index]){
					// 初始化当前组件位置
					this.state.imgsArrangeArr[index] = {
						pos:{
							left: 0,
							top: 0
						},
						rotate: 0,
						isInverse: false,
						isCenter: false
					};
				}
				// 插入图片组件
	     	imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
	      // 插入控制组件
	      controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
	    });//.bind(this));

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
}

AppComponent.defaultProps = {
};

export default AppComponent;
