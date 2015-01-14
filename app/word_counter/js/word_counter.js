var WordCounter;

(function() {

	/**
	 * コンストラクタ
	 */
	WordCounter = function() {
		/*----------------
		  インスタンス変数
		  ----------------*/

		/*----------------
		  初期処理
		 ----------------*/
		this._initialize();
		return this;
	};

	/**
	 * 初期処理
	 */
	WordCounter.prototype._initialize = function() {
	};

	WordCounter.prototype.execute = function(textWords, textSentence) {
		this.save(textWords, textSentence);
		return this._countWords(textWords, textSentence);
	};

	/**
	 */
	WordCounter.prototype._countWords = function(textWords, sentence) {

		// 改行を区切りとして単語を抽出する
		var words = textWords.split("\n");

		// 文章を小文字化
		var sentenceLower = sentence.toLowerCase();

		// 文章中の単語リストを取得
		var sentenceWords = this._sentenceWords(sentenceLower);

		// リストの各単語についてカウントする
		var result = [];
		for (var i=0, len=words.length; i<len; i++) {
			var word = $.trim( words[i].toLowerCase() );
			if (word.length == 0) continue;

			// 出現数をカウント
			var count = sentenceLower.split(word).length - 1;

			// 熟語かどうか
			var isIdiom = word.split(" ").length > 1;

			// 文章中に完全一致の単語があるか
			var strictHit = isIdiom ? true : ($.inArray(word, sentenceWords) != -1);

			result.push( {"word":word, "count":count, "strictHit":strictHit} );
		}

		// // 出現数の昇順でソート
		result.sort(function(a, b) {
    	    return (a.count < b.count) ? -1 : 1;
	    });

		return result;
	};

	/**
	 */
	WordCounter.prototype._sentenceWords = function(sentence) {
		sentence = sentence.replace(/[,\.\?]/g,'');
		sentence = sentence.replace(/\n/g,' ');
		var words = sentence.split(" ");
		var result = [];
		for (var i=0, len=words.length; i<len; i++) {
			var word = $.trim( words[i] );
			if (word.length == 0) continue;
			result.push(word);
		}
		return result;
	}

	/**
	 */
	WordCounter.prototype.save = function(words, sentence) {
		// console.log("saved.");
		this._saveWords(words);
		this._saveSentence(sentence);
	};

	/**
	 */
	WordCounter.prototype._saveWords = function(words) {
		Storage.setWords(words);
	};

	/**
	 */
	WordCounter.prototype._saveSentence = function(sentence) {
		Storage.setSentence(sentence);
	};

})();
