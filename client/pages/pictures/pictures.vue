<template>
	<div>
		<div class="">
			<div class="demo__content">
				<div class="demo__card-cont">
					<div class="demo__card">
						<div class="demo__card__top brown">
							<div class="demo__card__img"></div>
							<p class="demo__card__name">Hungry cat 6</p>
						</div>
						<div class="demo__card__btm">
							<p class="demo__card__we">Whatever</p>
						</div>
						<div class="demo__card__choice m--reject"></div>
						<div class="demo__card__choice m--like"></div>
						<div class="demo__card__drag"></div>
					</div>
					<div class="demo__card">
						<div class="demo__card__top lime">
							<div class="demo__card__img"></div>
							<p class="demo__card__name">Hungry cat 5</p>
						</div>
						<div class="demo__card__btm">
							<p class="demo__card__we">Whatever</p>
						</div>
						<div class="demo__card__choice m--reject"></div>
						<div class="demo__card__choice m--like"></div>
						<div class="demo__card__drag"></div>
					</div>
					<div class="demo__card">
						<div class="demo__card__top cyan">
							<div class="demo__card__img"></div>
							<p class="demo__card__name">Hungry cat 4</p>
						</div>
						<div class="demo__card__btm">
							<p class="demo__card__we">Whatever</p>
						</div>
						<div class="demo__card__choice m--reject"></div>
						<div class="demo__card__choice m--like"></div>
						<div class="demo__card__drag"></div>
					</div>
					<div class="demo__card">
						<div class="demo__card__top indigo">
							<div class="demo__card__img"></div>
							<p class="demo__card__name">Hungry cat 3</p>
						</div>
						<div class="demo__card__btm">
							<p class="demo__card__we">Whatever</p>
						</div>
						<div class="demo__card__choice m--reject"></div>
						<div class="demo__card__choice m--like"></div>
						<div class="demo__card__drag"></div>
					</div>
					<div class="demo__card">
						<div class="demo__card__top blue">
							<div class="demo__card__img"></div>
							<p class="demo__card__name">Hungry cat 2</p>
						</div>
						<div class="demo__card__btm">
							<p class="demo__card__we">Whatever</p>
						</div>
						<div class="demo__card__choice m--reject"></div>
						<div class="demo__card__choice m--like"></div>
						<div class="demo__card__drag"></div>
					</div>
					<div class="demo__card">
						<div class="demo__card__top purple">
							<div class="demo__card__img"></div>
							<p class="demo__card__name">Hungry cat</p>
						</div>
						<div class="demo__card__btm">
							<p class="demo__card__we">Whatever</p>
						</div>
						<div class="demo__card__choice m--reject"></div>
						<div class="demo__card__choice m--like"></div>
						<div class="demo__card__drag"></div>
					</div>
				</div>
				<div class="bqbox">
					<svg
						class="icon bq"
						aria-hidden="true"
					>
						<use xlink:href="#iconshiwangbiaoqing"></use>
					</svg>
					<svg
						class="icon bq"
						aria-hidden="true"
					>
						<use xlink:href="#iconhuachibiaoqing"></use>
					</svg>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				name: "32"
			};
		},
		mounted() {
			let that = this;
			$(document).ready(function() {
				var animating = false;
				var cardsCounter = 0;
				var numOfCards = 6;
				var decisionVal = 80;
				var pullDeltaX = 0;
				var deg = 0;
				var $card, $cardReject, $cardLike;
				function pullChange() {
					animating = true;
					deg = pullDeltaX / 10;
					$card.css(
						"transform",
						"translateX(" + pullDeltaX + "px) rotate(" + deg + "deg)"
					);
					var opacity = pullDeltaX / 100;
					var rejectOpacity = opacity >= 0 ? 0 : Math.abs(opacity);
					var likeOpacity = opacity <= 0 ? 0 : opacity;
					$cardReject.css("opacity", rejectOpacity);
					$cardLike.css("opacity", likeOpacity);
				}
				function release() {
					if (pullDeltaX >= decisionVal) {
						$card.addClass("to-right");
						console.log(that.name);
					} else if (pullDeltaX <= -decisionVal) {
						$card.addClass("to-left");
					}
					if (Math.abs(pullDeltaX) >= decisionVal) {
						$card.addClass("inactive");
						setTimeout(function() {
							$card.addClass("below").removeClass("inactive to-left to-right");
							cardsCounter++;
							if (cardsCounter === numOfCards) {
								cardsCounter = 0;
								$(".demo__card").removeClass("below");
							}
						}, 300);
					}
					if (Math.abs(pullDeltaX) < decisionVal) {
						$card.addClass("reset");
					}
					setTimeout(function() {
						$card
							.attr("style", "")
							.removeClass("reset")
							.find(".demo__card__choice")
							.attr("style", "");
						pullDeltaX = 0;
						animating = false;
					}, 300);
				}
				$(document).on(
					"mousedown touchstart",
					".demo__card:not(.inactive)",
					function(e) {
						if (animating) return;
						$card = $(this);
						$cardReject = $(".demo__card__choice.m--reject", $card);
						$cardLike = $(".demo__card__choice.m--like", $card);
						var startX = e.pageX || e.originalEvent.touches[0].pageX;
						$(document).on("mousemove touchmove", function(e) {
							var x = e.pageX || e.originalEvent.touches[0].pageX;
							pullDeltaX = x - startX;
							if (!pullDeltaX) return;
							pullChange();
						});
						$(document).on("mouseup touchend", function() {
							$(document).off("mousemove touchmove mouseup touchend");
							if (!pullDeltaX) return;
							release();
						});
					}
				);
			});
		},
		methods: {}
	};
</script>
<style scope>
	.demo {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 30.6rem;
		height: 54rem;
		margin-left: -15.3rem;
		margin-top: -27rem;
		background: #f6f6f5;
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
	}
	.demo__header {
		height: 6rem;
		background: #002942;
	}
	.demo__content {
		overflow: hidden;
		position: relative;
		height: 100%;
		padding-top: 2.5rem;

		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.demo__card-cont {
		position: relative;
		width: 24rem;
		height: 32rem;
		/* margin: 0 auto 10px; */
	}
	.demo__card {
		z-index: 2;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		-webkit-transform-origin: 50% 100%;
		-ms-transform-origin: 50% 100%;
		transform-origin: 50% 100%;
	}
	.demo__card.reset {
		-webkit-transition: -webkit-transform 0.3s;
		transition: transform 0.3s;
		-webkit-transform: translateX(0) !important;
		-ms-transform: translateX(0) !important;
		transform: translateX(0) !important;
	}
	.demo__card.reset .demo__card__choice {
		-webkit-transition: opacity 0.3s;
		transition: opacity 0.3s;
		opacity: 0 !important;
	}
	.demo__card.inactive {
		-webkit-transition: -webkit-transform 0.3s;
		transition: transform 0.3s;
	}
	.demo__card.to-left {
		-webkit-transform: translateX(-30rem) rotate(-30deg) !important;
		-ms-transform: translateX(-30rem) rotate(-30deg) !important;
		transform: translateX(-30rem) rotate(-30deg) !important;
	}
	.demo__card.to-right {
		-webkit-transform: translate(30rem) rotate(30deg) !important;
		-ms-transform: translate(30rem) rotate(30deg) !important;
		transform: translate(30rem) rotate(30deg) !important;
	}
	.demo__card.below {
		z-index: 1;
	}
	.demo__card__top {
		height: 20.5rem;
		padding-top: 4rem;
	}
	.demo__card__top.purple {
		background: #7132b9;
	}
	.demo__card__top.blue {
		background: #248cb6;
	}
	.demo__card__top.indigo {
		background: #303f9f;
	}
	.demo__card__top.cyan {
		background: #26c6da;
	}
	.demo__card__top.lime {
		background: #afb42b;
	}
	.demo__card__top.brown {
		background: #795548;
	}
	.demo__card__img {
		overflow: hidden;
		width: 10rem;
		height: 10rem;
		margin: 0 auto 1.5rem;
		border-radius: 50%;
		border: 0.5rem solid #ffffff;
		background-image: url("/img/udTln22.png");
		background-size: cover;
	}
	.demo__card__name {
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
		color: #fff;
	}
	.demo__card__btm {
		height: 11.5rem;
		background: #ffffff;
	}
	.demo__card__we {
		text-align: center;
		font-size: 2.2rem;
		line-height: 11.5rem;
	}
	.demo__card__choice {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.demo__card__choice:before {
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		width: 2rem;
		height: 2rem;
		margin-left: -1rem;
		color: #fff;
		border-radius: 50%;
		box-shadow: -2rem -3rem #fff, 2rem -3rem #fff;
	}
	.demo__card__choice:after {
		content: "";
		position: absolute;
		left: 50%;
		top: 50%;
		width: 4rem;
		height: 1.5rem;
		margin-left: -2rem;
		border: 0.6rem solid #fff;
		border-bottom: none;
		border-top-left-radius: 1.5rem;
		border-top-right-radius: 1.5rem;
	}
	.demo__card__choice.m--reject {
		background: #ff945a;
	}
	.demo__card__choice.m--like {
		background: #b1da96;
	}
	.demo__card__choice.m--like:after {
		-webkit-transform: scaleY(-1);
		-ms-transform: scaleY(-1);
		transform: scaleY(-1);
	}
	.demo__card__drag {
		z-index: 5;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		cursor: -webkit-grab;
		cursor: grab;
	}
	.demo__tip {
		text-align: center;
		font-size: 2.2rem;
	}

	.bq {
		height: 80px;
		width: 80px;
	}
	.bqbox {
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-top: 10px;
	}
</style>