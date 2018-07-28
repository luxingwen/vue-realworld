import { API_URL } from '@/common/config'

export default function (url) {
	var index = url.indexOf('http://')
    var index2 = url.indexOf('https://')
    if (index === 0 || index2 === 0) {
        return url
    }
    return API_URL + url
}