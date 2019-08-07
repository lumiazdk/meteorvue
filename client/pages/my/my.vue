<template>
	<div>
		<van-image
			round
			width="10rem"
			height="10rem"
			src="https://img.yzcdn.cn/vant/cat.jpeg"
		/>
		<van-cell
			value="内容"
			is-link
		>
			<template slot="title">
				<span class="custom-title">单元格</span>
				<van-tag type="danger">标签</van-tag>
			</template>
		</van-cell>

		<van-cell
			title="单元格"
			icon="shop-o"
		>
			<van-icon
				slot="right-icon"
				name="search"
				style="line-height: inherit;"
			/>
		</van-cell>
	</div>
</template>