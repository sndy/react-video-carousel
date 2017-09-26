import axios from 'axios';

export default class VODService {
	constructor(endpointUrl) {
		this.endpointUrl = endpointUrl;
	}
	getData() {
		return axios.get(this.endpointUrl)
		.then(response => {
			//added to format data between localhost & direct url call
			return response.status !== 200 ? [] : typeof response.data === 'string' ? 
			JSON.parse(response.data).entries : JSON.parse(JSON.stringify(response.data)).entries;
		}).catch(error =>
			console.log(error)
		);
	}
}