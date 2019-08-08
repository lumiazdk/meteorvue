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
                    <svg class="icon bq" aria-hidden="true">
                        <use xlink:href="#iconshiwangbiaoqing"></use>
                    </svg>
                    <svg class="icon bq" aria-hidden="true">
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
                        $card
                            .addClass("below")
                            .removeClass("inactive to-left to-right");
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
<style>
.bq {
    height: 80px;
    width: 80px;
}
.bqbox{
	width: 100%;
	display: flex;
	justify-content: space-around;
	margin-top: 10px
}
</style>