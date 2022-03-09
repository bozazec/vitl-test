import axios from "axios";

class HomeService {
	getItems() {
		const url = 'https://vitl-static-api.s3-eu-west-1.amazonaws.com/fe-test.json'
		return axios.get(url)
	}
}

export default new HomeService()