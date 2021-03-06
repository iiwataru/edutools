(function() {

	/**
	 * コンストラクタ
	 */
	Storage = function() {};

	/**
	 * 定数宣言
	 */
	Storage.Config = {
		KEY: {
			'WORDS': 'WORDS',
			'SENTENCE': 'SENTENCE'
		}
	};
	
	/*----------------------
	 * private利用メソッド
	 ----------------------*/
	/**
	 * 値登録
	 */
	Storage._set = function(name, value) {
		// console.log('Storage._set name='+name +' value='+value);

		// キー取得
		var key = Storage._getKey(name);
		if (key === false) return false;
		
		// ローカルストレージへ値登録
		localStorage.setItem(key, value);
		return true;
	};
		
	/**
	 * 値取得
	 */
	Storage._get = function(name) {
		// console.log('Storage._get name='+name);

		// キー取得
		var key = Storage._getKey(name);
		if (key === false) return null;

		// ローカルストレージから値取得
		return localStorage.getItem(key);
	},

	/**
	 * キー取得
	 */
	Storage._getKey = function(name) {
		var key = Storage.Config.KEY[name];
		if (typeof key === 'undefined') {
			console.log('Storage._getKey error: ' +name+'=>'+key);
			return false;
		}
		return key;
	};

	/*----------------------
	 * setter / getter
	 ----------------------*/
	/**
	 * ワード
	 */
	Storage.setWords = function(value) {return Storage._set('WORDS', value)};
	Storage.getWords = function() {return Storage._get('WORDS')};

	/**
	 * 文章
	 */
	Storage.setSentence = function(value) {return Storage._set('SENTENCE', value)};
	Storage.getSentence = function() {return Storage._get('SENTENCE')};

})();