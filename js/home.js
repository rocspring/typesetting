(function(window) {

	/**
	 *opts是一个对象，有多个属性。
	 *{
	 *	content : '', // 排版的内容
	 *	isRemoveColnWrap : true, // 是否去掉冒号分段
	 *	isChineseSegmented : true, // 是否中文段落分段
	 *	isEnglishSegmented : true	// 是否英文段落分段
	 *}
	 */

	function TypeSetting(opts) {
		extend(this, opts);
		this.init();
	}

	TypeSetting.prototype = {

		constructor : TypeSetting,

		contentArr : [],

		init : function() {
			this.splitContent();
			this.star();
			this.mergeContent();
		},

		star : function() {
			this.removeColonWrap();
			this.chineseSegmented();
			this.englishSegmented();
		},

		splitContent : function() {
			var content = this.content,
				tempArr = content.split('\n');

			this.contentArr = tempArr;

		},

		removeColonWrap : function() {
			var contentArr = this.contentArr,
				i = 0,
				len = contentArr.length,
				tempArr = [];

			for (; i < len; i++) {
				if ( lastChartIsColon(contentArr[i]) && contentArr[i + 1] === ' ' ) {
					// contentArr[i + 1] = null;
					tempArr.push(i + 1);
				}
			}

			this.contentArr = remove( contentArr, tempArr );


		},

		mergeParagraph : function() {
			var contentArr = this.contentArr,
				i = 0,
				j = 0,
				len = contentArr.length,
				paragraphArr = [];

			for( ; i < len; i++ ){
				if (contentArr[i] !== ' ') {
					paragraphArr[j] = [];
					paragraphArr[j].push(contentArr[i]);
				}else{
					j++;
				}
			}	

		},

		chineseSegmented : function() {

		},

		englishSegmented : function() {

		}
	};

	// 扩展对象的属性
	function extend(c, p) {
		var isObject = function(p) {
			return Object.prototype.toString.call(p) === '[object Object]';
		};

		if (!isObject(c) || !isObject(p)) return;

		for (var i in p) {
			if (p.hasOwnProperty(i)) {
				c[i] = p[i];
			}
		}

		return c;
	}

	// 判断最后一个字符是否是冒号
	function lastChartIsColon(str) {
		var lastChart = str.charAt( str.length - 1 );

		return  str.charAt( str.length - 1 ) === ':' || str.charAt( str.length - 1 ) === '：';
	}

	// 给数组添加一个删除元素方法
	function remove (arr, index) {
		if( typeof arr === 'object' && toString.call(arr) === '[object Array]'){
			if ( typeof index === 'number' &&  index >= 0 ) {
				return arr.remove ? arr.remove(index) : arr.slice(0, index).concat(arr.slice( index + 1, arr.length));
			} else if ( typeof index === 'object' && toString.call(index) === '[object Array]' ) {
				// 传入一个下标数组，删除这些元素
				var newArr = [];
				for ( var i = 0, len = index.length; i < len; i++ ){
					arr[index[i]] = void 0;
				}

				for( var j = 0, arrLen = arr.length; j < arrLen; j++ ){
					if ( arr[j] !== void 0 ) {
						newArr.push(arr[j]);
					}
				}

				return newArr;
			}
			
		}
	}

})(window);
