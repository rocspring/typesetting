(function(window) {

	var FileOperate = {

		readFile: function(files, fun) {

			if (FileReader === 'undefined') {
				alert('你的浏览器不支持文件操作，请更换浏览器！');
				return;
			}

			if (files.length) {
				var file = files[0],
					reader = new FileReader();

				reader.onload = function() {
					fun(this.result);
				};
				reader.readAsText(file);
			}
		},

		saveFile: function(data, name) {
			var encodeData = encodeURIComponent(data);
			var blob = new Blob([encodeData], {type: "text/plain;charset=utf-8"});
			saveAs(blob, name);
		}
	};

	window.FileOperate = FileOperate;

})(window);