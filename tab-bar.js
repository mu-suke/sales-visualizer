jQuery(function() {
	//クリックしたときのファンクションをまとめて指定
	jQuery('.tab li').click(function() {

		//.index()を使いクリックされたタブが何番目かを調べ、
		//indexという変数に代入します。
		var index = jQuery('.tab li').index(this);

		//コンテンツを一度すべて非表示にし、
		jQuery('.content li').css('display','none');

		//クリックされたタブと同じ順番のコンテンツを表示します。
		jQuery('.content li').eq(index).css('display','block');

		//一度タブについているクラスselectを消し、
		jQuery('.tab li').removeClass('select');

		//クリックされたタブのみにクラスselectをつけます。
		jQuery(this).addClass('select')
	});
});
