<template>
	<div>
		<h2>本地话编辑器测试</h2>
		<div>
			<textarea
				name=""
				id="edit"
				cols="30"
				rows="10"
				class="tinymce"
			></textarea>
		</div>
	</div>
</template>
<script>
import vm from './vm';

export default vm;
</script>
<style lang="stylus" scoped>
@import "./style.styl";
</style>
