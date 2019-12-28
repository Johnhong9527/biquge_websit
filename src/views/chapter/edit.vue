<template>
	<el-row class="chapter-box" v-if="chapter && chapter.title">
		<el-col :span="24">
			<el-input type="text" v-model="title">
				<template slot="prepend">章节名</template>
			</el-input>
			<br />
		</el-col>
		<el-col :span="24" :key="tinymceKey">
			<tinymce
				ref="edit"
				v-if="chapter && chapter.content"
				:value="chapter.content"
				@input="setContent"
				:height="500"
			/>
			<br />
			<el-button @click="next(0)">上一章</el-button>
			<el-button @click="back">后退</el-button>
			<el-button @click="save">保存</el-button>
			<el-button @click="format">格式化</el-button>
			<el-button @click="next(1)">下一章</el-button>
		</el-col>
	</el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Tinymce from '@/components/Tinymce/index.vue';

export default {
	name: 'view-chapter',
	async created() {
		await this.getChapter(this.$route.params);
		this.tinymceKey = Date.parse(new Date());
		this.$refs.edit.init();
	},
	data() {
		return {
			tinymceKey: '',
		};
	},
	components: { Tinymce },
	watch: {
		$route(to, from) {
			this.$refs.edit.init();
			if (to.path !== from.path) {
				this.$nextTick(() => {
					this.getChapter(this.$route.params);
					this.tinymceKey = Date.parse(new Date());
					this.$refs.edit.init();
				});
			}
		},
	},
	methods: {
		...mapActions('mChapter', [
			'getChapter',
			'setChapter',
			'setContent',
			'setTitle',
			'nextChapter',
		]),
		initChapter() {
			this.getChapter(this.$route.params);
			this.tinymceKey = Date.parse(new Date());
			this.$refs.edit.init();
		},
		save() {
			this.setChapter({
				...this.$route.params,
				...this.chapter,
				content: this.content,
				title: this.title,
			});
			// this.$router.go(-1);
			setTimeout(() => {
				this.initChapter();
			}, 200);
		},
		format() {
			this.setChapter({
				...this.$route.params,
				...this.chapter,
				content: this.content,
				title: this.title,
				format: true,
			});
			setTimeout(() => {
				this.initChapter();
			}, 200);
		},
		back() {
			this.$router.go(-1);
		},
		next(index) {
			this.nextChapter({
				...this.$route.params,
				next: index,
				page: this,
				path: 'edit-chapter',
			});
		},
	},
	computed: {
		...mapState('mChapter', {
			chapter: state => state.chapter,
			content: state => state.content,
		}),
		// content: {
		//   get() {
		//     return this.$store.state.mChapter.content;
		//   },
		//   set(value) {
		//     this.setContent(value);
		//   },
		// },
		title: {
			get() {
				return this.$store.state.mChapter.title;
			},
			set(value) {
				this.setTitle(value);
			},
		},
	},
};
</script>

<style lang="stylus" scoped>
.title
  font-size: 19pt
  padding-top: 10px;
  text-align: center
.chapter-box
  padding 20px 10px 0
.content
  /*white-space pre*/
  text-align left
  font-size: 10pt
  letter-spacing: 0.2em
  line-height: 150%
  padding-top: 15px
  width: 85%
</style>
