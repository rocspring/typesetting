(function(window) {

	/**
	 *opts是一个对象，有多个属性。
	 *{
	 *	content : '', // 排版的内容
	 *	isRemoveColnWrap : true, // 是否去掉冒号分段
	 *	isMergeParagraph : true, // 是否合并相邻行
	 *	isSplitParagraph : true	//  是否分割过长的段落
	 *}
	 */
	var resultArr = [];

	function TypeSetting(opts) {
		extend(this, opts);
		this.init();
	}

	TypeSetting.prototype = {

		constructor: TypeSetting,

		contentArr: [],

		paragraphArr: [],

		result: '',

		init: function() {
			this.splitContent();
			this.star();
			this.mergeContent();
		},

		star: function() {
			if (this.isRemoveColnWrap) {
				this.removeColonWrap();
			}
			if (this.isMergeParagraph) {
				this.mergeParagraph();
			}
			if (this.isSplitParagraph) {
				this.splitParagraph();
			}
		},

		splitContent: function() {
			var content = this.content,
				tempArr = content.split('\n');

			this.contentArr = tempArr;

		},

		mergeContent: function() {
			var paragraphArr = this.paragraphArr,
				len = paragraphArr.length,
				tempLen = 0,
				i = 0,
				j = 0,
				k = 0,
				resultArr = [],
				resultLen = 0,
				resultStr = '';

			for (; i < len; i++) {
				tempLen = paragraphArr[i].length;
				if (tempLen === 1) {
					resultArr = resultArr.concat(paragraphArr[i]);
				} else {
					for (; j < tempLen; j++) {
						resultArr = resultArr.concat(paragraphArr[i][j]);
					}
				}
			}

			resultLen = resultArr.length;
			for (; k < resultLen; k++) {
				resultStr += resultArr[k] + '\r\n';
				resultStr += '\r\n';
			}

			this.result = resultStr;
		},

		removeColonWrap: function() {
			var contentArr = this.contentArr,
				i = 0,
				len = contentArr.length,
				tempArr = [];

			for (; i < len; i++) {
				if (lastChartIsColon(contentArr[i]) && contentArr[i + 1] === '') {
					// contentArr[i + 1] = null;
					tempArr.push(i + 1);
				}
			}

			this.contentArr = remove(contentArr, tempArr);


		},

		mergeParagraph: function() {
			var contentArr = this.contentArr,
				i = 0,
				j = 0,
				k = 0,
				len = contentArr.length,
				paragraphArr = [];

			for (; i < len; i++) {
				if (contentArr[i] !== '') {
					if (!isArray(paragraphArr[j])) {
						paragraphArr[j] = [];
					}
					paragraphArr[j].push(contentArr[i]);
				} else {
					j++;
				}
			}

			//  合并内容过少的段落
			var paragraphLen = paragraphArr.length,
				tempStr = '',
				tempLen,
				l = 0;

			for (; k < paragraphLen; k++) {
				tempLen = paragraphArr[k].length;
				if (tempLen >= 1) {
					for (l = 0; l < tempLen; l++) {
						tempStr += paragraphArr[k][l];
					}
					paragraphArr[k] = tempStr;
					tempStr = '';
				}
			}

			this.paragraphArr = paragraphArr;
		},

		splitParagraph: function() {
			var paragraphArr = this.paragraphArr,
				i = 0,
				len = paragraphArr.length;

			for (; i < len; i++) {
				if (isChinese(paragraphArr[i])) {
					paragraphArr[i] = this.chineseSegmented(paragraphArr[i]);
				} else {
					paragraphArr[i] = this.englishSegmented(paragraphArr[i]);
				}
			}

			this.paragraphArr = paragraphArr;
		},

		chineseSegmented: function(str) {
			var chineseMaxLen = 1000,
				tempArr = [];

			segment(str, chineseMaxLen);
			tempArr = resultArr;
			resultArr = [];

			return tempArr;
		},

		englishSegmented: function(str) {
			var englishMaxLen = 800,
				tempArr = [];

			segment(str, englishMaxLen);
			tempArr = resultArr;
			resultArr = [];
			
			return tempArr;
		}
	};

	window.TypeSetting = TypeSetting;

	// 分割段落
	function segment(str, ml) {
		var maxLen = ml,
			len = str.length,
			tempStr = '',
			tempLen = 0,
			tempChar = '',
			i, j,
			surplusStr = '',
			endSymbolReg = /。|？|！|”|…|\.|\?|\!/;

		if (len <= maxLen) {
			resultArr.push(str);
			return;
		} else {
			tempStr = str.substring(0, maxLen);
			for (i = maxLen; i >= 0; i--) {
				tempChar = tempStr.charAt(i);
				if (endSymbolReg.test(tempChar)) {
					resultArr.push(str.substring(0, i + 1));
					surplusStr = str.substring(i + 1, len);
					break;
				}
			}

			// 防止maxLen过小，不能分割段落
			if (surplusStr === '') {
				surplusStr = str;
				maxLen = 2 * ml;
			}
		}

		arguments.callee(surplusStr, maxLen);
	}

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
		var lastChart = str.charAt(str.length - 1);

		return str.charAt(str.length - 1) === ':' || str.charAt(str.length - 1) === '：';
	}

	// 给数组添加一个删除元素方法
	function remove(arr, index) {
		if (typeof arr === 'object' && toString.call(arr) === '[object Array]') {
			if (typeof index === 'number' && index >= 0) {
				return arr.remove ? arr.remove(index) : arr.slice(0, index).concat(arr.slice(index + 1, arr.length));
			} else if (typeof index === 'object' && toString.call(index) === '[object Array]') {
				// 传入一个下标数组，删除这些元素
				var newArr = [];
				for (var i = 0, len = index.length; i < len; i++) {
					arr[index[i]] = void 0;
				}

				for (var j = 0, arrLen = arr.length; j < arrLen; j++) {
					if (arr[j] !== void 0) {
						newArr.push(arr[j]);
					}
				}

				return newArr;
			}

		}
	}

	function isArray(p) {
		return Object.prototype.toString.call(p) === '[object Array]';
	}

	// 判断一个段落是否是中文
	// 中文字符占比超过80%
	function isChinese(s) {
		var str = s || '',
			i = 0,
			len = str.length,
			num = 0;

		for (; i < len; i++) {
			if (str.charCodeAt(i) > 255) {
				num++;
			}
		}

		if (num > 0 && len > 0 && num / len > 0.8) {
			return true;
		} else {
			return false;
		}
	}

})(window);
