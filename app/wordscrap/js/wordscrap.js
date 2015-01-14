var WordScrap;

(function() {

	/**
	 * コンストラクタ
	 */
	WordScrap = function() {
		this._initialize();
		return this;
	};

	/**
	 * 初期処理
	 */
	WordScrap.prototype._initialize = function() {
		this._setEvents();
		this._initForm();
	};

	/**
	 * イベント登録
	 */
	WordScrap.prototype._setEvents = function() {

		var self = this;

		$('form').on('submit', function(e) {
			self._execute();
			return false;
		});

		/**
		 * body
		 */
		$('body').on('keydown', function(e) {
			if (event.shiftKey) { //Shift

				if (e.keyCode === 13) { //Enter
					self._execute();
					return false;
				}
				else if (e.keyCode === 8) { //Delete
					self._initForm();
					return false;
				}
			}
		});

		/**
		 * 実行ボタン
		 */
		$('#submit').on('click', function() {
			self._execute();
			return false;
		});

		/**
		 * クリアボタン
		 */
		$('#clear').on('click', function() {
			self._initForm();
			return false;
		});

		/**
		 * セパレータ
		 */
		$('#separator').focus(function() {
			this.select();
		});

		$('#separator').on('keydown', function(e) {
			if (e.keyCode === 13) { //Enter
				self._execute();
				return false;
			}
		});

		/**
		 * 出力エリア
		 */
		$('#text_out').focus(function() {
			this.select();
		});

	};

	/**
	 * フォームを初期化
	 */
	WordScrap.prototype._initForm = function() {
		$('#text_in').val('');
		$('#text_out').val('');
		$('#text_in').focus();
	};

	/**
	 * 実行
	 */
	WordScrap.prototype._execute = function() {

		// 入力テキストを抽出し、不要な文字を削除する
		var text = $('#text_in').val();
		text = $.trim(text);
		text = text.replace(/\.$/,'');
		text = text.replace(/[ 　]+/gi,' ');

		// 語順を並べ替える
		var words = text.split(' ');
		var wordsSuffled = this._shuffle(words);

		// 結果を出力し、全選択する
		var separator = ' / ';
		$('#text_out').val( wordsSuffled.join(separator) );
		$('#text_out').select();
	};

	/**
	 * 配列をシャッフルする
	 */
	WordScrap.prototype._shuffle = function(array) {

		var copy = [], n = array.length, i;

		while (n) {
			i = Math.floor(Math.random() * n--);
			copy.push(array.splice(i, 1)[0]);
		}

		return copy;
	};

	/*----------------
	  インスタンス化
	  ----------------*/
	var WordScrap = new WordScrap();

})();
