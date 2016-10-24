require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

//let yeomanImage = require('../images/yeoman.png');

// 获取图片json数据
var imageDatas = require('../data/imageDatas.json');

// 自执行函数 参数：imageDatas
imageDatas = (function getImageUrl(imageDatasArr) {
	for(var i = 0; i < imageDataArr.length; i++) {
		// 单张图片数据
		var singleImageData = imageDatasArr[i];
		// 添加新属性 imageUrl 存放图片路径信息
		singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		imageDatasArr[i] = singleImageData;
	}
	return imageDatasArr;
})(imageDatas);


class AppComponent extends React.Component {
  render() {
    return (
    	// 舞台
    	<section clasName="stage">
    		<section className="img-sec">
    		</section>
    		<nav clasName="controller-nav">
    		</nav>
    	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
