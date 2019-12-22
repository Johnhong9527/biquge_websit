<template>
	<div class="add-chapter">
		<el-form :model="newChapter" v-if="newChapter">
			<el-form-item label="章节名" :label-width="formLabelWidth">
				<el-input v-model="title" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="地址" :label-width="formLabelWidth">
				<el-input v-model="href" autocomplete="off"></el-input>
			</el-form-item>
			<el-row>
				<el-col :span="2">
					正文
				</el-col>
				<el-col :span="22">
					<Tinymce ref="add" @input="setContent" :height="300" />
				</el-col>
			</el-row>
			<el-row>
				<br />
				<el-button @click="back">后退</el-button>
				<el-button @click="save">保存</el-button>
			</el-row>
		</el-form>
	</div>
</template>
<script type="text/javascript">
import { mapState, mapActions } from 'vuex';
import Tinymce from '../components/Tinymce/index.vue';

export default {
	name: 'add-chapter',
	data() {
		return {
			formLabelWidth: '80px',
			title: '',
			content: '',
			href: '',
		};
	},
	created() {
		// console.log(this.$refs);
	},
	mounted() {
		if (this.newChapter && this.newChapter.aid) {
			// console.log('可以创建章节信息');
		} else {
			this.$router.go(-1);
		}
	},
	methods: {
		...mapActions('mChapter', ['setNewChapter', 'createChapter']),
		setContent(val) {
			this.content = val;
		},
		back() {
			this.$router.go(-1);
		},
		save() {
			if (this.newChapter && this.newChapter.aid) {
				// console.log(this.newChapter);
				this.createChapter({
					...this.newChapter,
					title: this.title,
					content: this.content,
					href: this.href,
				});
			} else {
				// console.log('回到首页');
			}
		},
	},
	components: { Tinymce },
	computed: {
		...mapState('mChapter', {
			chapterInfo: state => state.chapterInfo,
			newChapter: state => state.newChapter,
		}),
	},
};
</script>
<style type="text/css">
.add-chapter {
	padding: 15px;
}
</style>
