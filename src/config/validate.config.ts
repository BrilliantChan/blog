import type {Rule} from 'ant-design-vue/es/form';

export type ValidateConfig = Record<string, Partial<Rule>[]>;

export type Validator = Rule['validator'];

export default <ValidateConfig> {
    account: [
        {required: true, message: '账号必填'},
	    {min: 6, message: '账号不能小于六位'},
	    {whitespace: true, message: '账号不能有空格'},
	    {pattern: /^[a-zA-Z0-9_-]{6,30}$/, message: '账号格式不正确'}
    ],
    password: [
        {required: true, message: '密码必填'},
        {min: 6, message: '密码不能小于六位'},
	    {whitespace: true, message: '密码不能有空格'}
    ],
    email: [
        {required: true, message: '邮箱必填'},
        {type: 'email', message: '邮箱格式不正确'}
    ]
};
