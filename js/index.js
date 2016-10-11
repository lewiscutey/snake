$(function(){

var scene = $('.scene');
var start = $('.start');
var restart = $('.restart');
var lose = $('.lose');
var continuee = $('.lose .continue');
var exit = $('.lose .exit');
var close = $('.lose .close');
var end = $('.end');
var score = $('.score>p');
var index = 0;
var timerId = null;

function snake(){

	// 用色彩小方块把场景填充满
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			var r = Math.floor(Math.random()*255);
			var g = Math.floor(Math.random()*255);
			var b = Math.floor(Math.random()*255);
			var color = "rgba("+r+","+g+","+b+",1)";
			// var color = "rgba(132,134,216,1)";
			$('<div>').attr('id',i+'_'+j)
					  .addClass('box')
					  // .css('backgroundColor',color)
					  .appendTo('.scene');
		};
	};

	// 创建蛇，开始的三个格子
	var she = [{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	// 创建蛇表，判断蛇占据的位置为true，为了防止食物放在蛇身上
	var shebiao = {'0_0':true,'0_1':true,'0_2':true};

	// 找到一个具体的格子的方法
	function findDiv(x,y){
		return $('#'+x+"_"+y);
	};

	// 遍历蛇，并且给蛇身上添加格子
	$.each(she,function(i,v){
		findDiv(v.x,v.y).addClass('she');	
	});

	// 随机放一个食物
	function fangshiwu(){
		do{
			var x = Math.floor(Math.random()*19);
			var y = Math.floor(Math.random()*19);
		}while(shebiao[x+"_"+y]);
		findDiv(x,y).addClass('shiwu');
		return {x:x,y:y};
	};
	var shiwu = fangshiwu();

	// 让蛇自己跑的方法
	move = function(){
		var jiutou = she[she.length-1];
		if(direction === "you"){
			var xintou = {x:jiutou.x,y:jiutou.y+1};
		}
		if(direction === "zuo"){
			var xintou = {x:jiutou.x,y:jiutou.y-1};
		}
		if(direction === "shang"){
			var xintou = {x:jiutou.x-1,y:jiutou.y};
		}
		if(direction === "xia"){
			var xintou = {x:jiutou.x+1,y:jiutou.y};
		}

		if(shebiao[xintou.x+"_"+xintou.y]){
			lose.css('display','block');
			clearInterval(timerId);
			return;
		};

		if(xintou.x<0||xintou.x>19||xintou.y<0||xintou.y>19){
			clearInterval(timerId);
			lose.css('display','block');
			return;
		};
		she.push(xintou);
		shebiao[xintou.x+"_"+xintou.y] = true;
		findDiv(xintou.x,xintou.y).addClass('she');

		if(xintou.x === shiwu.x&&xintou.y === shiwu.y){
			findDiv(shiwu.x,shiwu.y).removeClass('shiwu');
			score.text(index+=2);
			shiwu = fangshiwu();
		}else{
			var weiba = she.shift();
			delete shebiao[weiba.x+"_"+weiba.y];
			findDiv(weiba.x,weiba.y).removeClass('she');
		};
	};

	direction = "you";
	// 定义方向键
	$(document).on('keyup',function(e){
		var fanbiao = {"zuo":37,"shang":38,"you":39,"xia":40};
		var biao = {37:"zuo",38:"shang",39:"you",40:"xia"};
		if(Math.abs(e.keyCode-fanbiao[direction])===2){
			return;
		}
		if(biao[e.keyCode]){
			direction = biao[e.keyCode];
		};
	});
	timerId = setInterval(move,200);

}

// 开始游戏按钮
start.on('click',function(){
	snake();
	start.off('click');
});

// 重新开始游戏
restart.on('click',function(){
	scene.empty();
	snake();
});

// 暂停游戏按钮
end.on('click',function(){
	clearInterval(timerId);
});

//继续游戏按钮
continuee.on('click',function(){
	close.click();
	scene.empty();
	snake();
});

//退出游戏按钮
exit.on('click',function(){
	scene.empty();
	close.click();
});

//关闭按钮
close.on('click',function(){
	$(this).parent().css('display','none');
})




});