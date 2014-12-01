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

		mergeContent : function() {

		},

		removeColonWrap : function() {
			var tempArr = this.contentArr,
				i = 0,
				len = tempArr.length;

			for (; i < len; i++) {

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

})(window);