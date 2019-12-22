//vue下配置文件参数
const vueConfig = {
	//注意，这里的public就是对于eggjs下的静态资源
	publicPath: process.env.NODE_ENV === 'production' ? '/public' : '/', //部署应用包时的基本 URL
};
module.exports = vueConfig;
