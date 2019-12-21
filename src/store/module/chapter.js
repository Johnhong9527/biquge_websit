import API from '../../util/api';

export default {
	namespaced: true,
	state: {
		chapter: {},
		content: '',
		title: '',
		newChapter: {},
		dialogVisible: false,
	},
	mutations: {
		initChapter(state) {
			state.chapter = {};
			state.content = '';
			state.title = '';
		},
		getChapter(state, chapter) {
			state.chapter = {};
			state.chapter = chapter;
		},
		setChapter(state, book) {
			state.book = book;
		},
		setContent(state, content) {
			state.content = content;
		},
		setTitle(state, title) {
			state.title = title;
		},
		setNewChapter(state, newChapter) {
			state.newChapter = newChapter;
		},
		setDialogVisible(state, dialogVisible) {
			state.dialogVisible = dialogVisible;
		},
	},
	actions: {
		// eslint-disable-next-line
		async nextChapter({ commit }, { page, index, aid, cid, next, path }) {
			try {
				const data = await API.nextChapter({
					index,
					aid,
					cid,
					next,
				});
				const nextChapterData = data.data;
				if (`${nextChapterData}`.indexOf('cid') < 0) {
					page.$router.push(`/${path}/${index}/${aid}/${nextChapterData}`);
				}
			} catch (e) {
				console.log(e);
			}
		},
		async getChapter({ commit }, params) {
			const chapter = await API.getChapter(params);
			commit('getChapter', chapter.data);
			commit('setContent', chapter.data.content);
			commit('setTitle', chapter.data.title);
		},
		// eslint-disable-next-line no-unused-vars
		async setChapter({ commit }, params) {
			try {
				const { format = false } = params;
				// const index = window.Number.parseInt(params.index);
				let { content } = params;
				// console.log(index, content);
				// console.log(content.indexOf('/\n'));
				// 处理数据
				if (format) {
					// test
					const pArr = content.split('</p>');
					if (
						pArr.length < 5 &&
						content.indexOf('&nbsp;&nbsp;&nbsp;&nbsp;') > -1
					) {
						// eslint-disable-next-line no-const-assign
						content = content.replace('<p>', '').replace('</p>', '');
						const arr = content.split('&nbsp;&nbsp;&nbsp;&nbsp;');
						// eslint-disable-next-line camelcase,no-unused-vars
						let new_content = '';
						arr.forEach(el => {
							if (el !== '') {
								// eslint-disable-next-line camelcase
								new_content += `<p>&nbsp;&nbsp;&nbsp;&nbsp;${el}</p>`;
							}
						});
						// eslint-disable-next-line camelcase,no-param-reassign
						params.content = new_content;
					}
				}
				// console.log(params.content);
				await API.setChapter(params);
			} catch (e) {
				console.log(e);
			}
		},
		setContent({ commit }, content) {
			commit('setContent', content);
		},
		setTitle({ commit }, title) {
			commit('setTitle', title);
		},
		setNewChapter({ commit }, params) {
			commit('setNewChapter', params);
		},
		setDialogVisible({ commit }, dialogVisible) {
			commit('setDialogVisible', dialogVisible);
		},

		createChapter(
			// eslint-disable-next-line
			{ commit },
			// eslint-disable-next-line
			{ book_index, index, aid, cid, title, content, href },
		) {
			// console.log(book_index, index, aid, cid, title, content);
			API.creChapter({ book_index, index, aid, cid, title, content, href });
		},
	},
};
