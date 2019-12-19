import API from '../../util/api';

export default {
	namespaced: true,
	state: {
		chapter: {},
		content: '',
		title: '',
	},
	mutations: {
		getChapter(state, chapter) {
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
	},
	actions: {
		async getChapter({ commit }, params) {
			console.log(params.cid);
			const chapter = await API.getChapter(params);
			commit('getChapter', chapter.data);
			commit('setContent', chapter.data.content);
			commit('setTitle', chapter.data.title);
		},
		// eslint-disable-next-line no-unused-vars
		async setChapter({ commit }, params) {
			try {
				console.log('params', params.title);
				// 处理数据
				/* if (content.indexOf('&nbsp;&nbsp;&nbsp;&nbsp;') > -1) {
					// eslint-disable-next-line no-const-assign
					content = content.replace('<p>', '').replace('</p>', '');
					const arr = content.split('&nbsp;&nbsp;&nbsp;&nbsp;');
					// eslint-disable-next-line camelcase,no-unused-vars
					let new_content = '';
					arr.forEach(el => {
						if (el !== '') {
							// eslint-disable-next-line camelcase
							new_content += `<p>${el}</p>`;
						}
					});
					// eslint-disable-next-line camelcase,no-param-reassign
					params.content = new_content;
				} */
				// console.log('params.content', params.content);

				await API.setChapter(params);
				// await API.editChapters({
				// 	aid: params.aid,
				// 	cid: params.cid,
				// 	index: params.index,
				// 	title: params.title,
				// });

				// const getBook = await API.getBook({
				// 	index: params.index,
				// 	aid: params.aid,
				// });
				// commit('setChapter', getBook.data);

				// state.chapter.title = params.title;
				// state.chapter.content = params.content;
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
	},
};
