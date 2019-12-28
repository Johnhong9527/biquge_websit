<template>
	<div>
		<h2>可爬虫网站</h2>
		<el-button @click="create">
			新增
		</el-button>
	</div>
</template>

<script>
export default {
	created() {},
	methods: {
		create() {
			this.$router.push('/create-reptile');
		},
	},
};
</script>
