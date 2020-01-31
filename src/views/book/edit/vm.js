// eslint-disable-next-line import/extensions,import/no-absolute-path,import/no-unresolved
// import './tinymce/tinymce';
// import tinymce from './tinymce.min';

const vm = {
  name: 'edit',
  created() {
    console.log(8);
    this.init();
  },
  methods: {
    init() {
      console.log(window.tinymce.init);
      window.tinymce.init({
        selector: '#edit',
        height: 600,
      });
    },
  },
};
export default vm;
