var Index;

(function() {

	/**
	 * コンストラクタ
	 */
	Index = function() {
		/*----------------
		  インスタンス変数
		  ----------------*/
		this._wordCounter = new WordCounter();

		/*----------------
		  初期処理
		 ----------------*/
		this._initialize();
		return this;
	};

	/**
	 * 定数宣言
	 */
	Index.Config = {
		AUTO_SAVE_INTERVAL: 30000
	};

	/**
	 * 初期処理
	 */
	Index.prototype._initialize = function() {
		this._setEvents();
		this._initForm();
		this._initAutoSave();
	};

	/**
	 * イベント登録
	 */
	Index.prototype._setEvents = function() {

		var self = this;

		/**
		 * 実行ボタン
		 */
		$('#submit').on('click', function() {
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
			}
		});

		/**
		 * 結果の単語
		 */
		$(document).on('click', '.word', function() {
			var word = $(this).attr('value');
			self._showResultSentence(word);
			return false;
		});
	};

	/**
	 * フォームを初期化
	 */
	Index.prototype._initForm = function() {

		// キャッシュから読込み
		var words = Storage.getWords();
		var sentence = Storage.getSentence();
		$('#text_words').val(words);
		$('#text_sentence').val(sentence);

		// フォーカス
		$('#text_words').focus();

		// 結果クリア
		this._clearResult();
	};

	/**
	 * 結果クリア
	 */
	Index.prototype._clearResult = function() {
		$('#result_words').html('');
		$('#result_sentence').html('');
	}

	/**
	 * 結果表示（単語）
	 */
	Index.prototype._showResultWords = function() {
		var words = $('#text_words').val();

		// サニタイジング
		words = $('<div/>').text(words).html();

		// カウント実行
		var result = this._wordCounter.execute(words , $('#text_sentence').val() );

		// 結果表示
		var html = "";
		var template = $("#result-template").text();
		for (var i=0, len=result.length; i<len; i++) {
			html += _.template(template, result[i]);
		}
		$('#result_words').html(html);
	};

	/**
	 * 結果表示（文章。単語ハイライト付き）
	 */
	Index.prototype._showResultSentence = function(word) {
		var wordUpperFirst = word.charAt(0).toUpperCase() + word.slice(1);
		var sentence = $('#text_sentence').val();

		// サニタイジング
		sentence = $('<div/>').text(sentence).html();

		// ハイライト処理
		sentence = sentence.replace(new RegExp(word, 'g'),'<span class="mark">'+word+'</span>');
		sentence = sentence.replace(new RegExp(wordUpperFirst, 'g'),'<span class="mark">'+wordUpperFirst+'</span>');

		// 改行をマークアップに変換
		sentence = sentence.replace(/\n/g,'<br>');
		$('#result_sentence').html(sentence);
	};

	/**
	 * 自動保存
	 */
	Index.prototype._initAutoSave = function() {
		setInterval(this._save, Index.Config.AUTO_SAVE_INTERVAL);
	};

	Index.prototype._save = function() {
		var self = Index;
		self._wordCounter.save($('#text_words').val(), $('#text_sentence').val());
	};

	/**
	 * 実行
	 */
	Index.prototype._execute = function() {
		this._clearResult();
		this._showResultWords();
	};

	/*----------------
	  インスタンス化
	  ----------------*/
	var Index = new Index();

})();
