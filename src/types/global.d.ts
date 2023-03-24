export declare global {
	import {GenderMap} from '../config/types';

    type StateMap = 'done' | 'loading' | 'error' | 'logout'
	type VuexState = Record<string, string | number>

	interface MemberInfo {
		id: string,
		nickName: string,
		gender: {
			value: keyof typeof GenderMap,
			label: string
		},
		createTime: string
	}
}
