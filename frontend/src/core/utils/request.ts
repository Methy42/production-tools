import axios from "axios";
import storage from "./storage";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;

NProgress.configure({
	showSpinner: false
});

// 忽略规则
const ignore = {
	NProgress: ["/sys/info/record"],
	token: ["/login", "/captcha"]
};

// Request
axios.interceptors.request.use(
	(config: any) => {
		if (config.url) {
			if (!ignore.NProgress.some((e) => config.url.includes(e))) {
				NProgress.start();
			}
		}
    
		// 请求信息
		// if (isDev) {
    console.group(config.url);
    console.log("method:", config.method);
    console.table("data:", config.method == "get" ? config.params : config.data);
    console.groupEnd();
		// }

		return config;
	},
	(error) => {
		return error;
	}
);

// Response
axios.interceptors.response.use(
	(res) => {
		NProgress.done();

		return res;
	},
	(error) => {
		NProgress.done();

		return error.response;
	}
);

export default axios;
