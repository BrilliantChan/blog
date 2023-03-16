import type {SelectProps} from 'ant-design-vue';

const colorPickerLanguages :SelectProps['options'] = [
    {
        value: 'ZH-cn',
        label: '中文'
    },
    {
        value: 'En',
        label: 'English'
    }
];

const colorPickerFormat :SelectProps['options'] = [
    {
        label: 'Hex',
        value: 'hex'
    },
    {
        label: 'Rgb',
        value: 'rgb'
    },
    {
        label: 'Prgb',
        value: 'prgb'
    },
    {
        label: 'Hex6',
        value: 'hex6'
    },
    {
        label: 'Hex3',
        value: 'hex3'
    },
    {
        label: 'Hex4',
        value: 'hex4'
    },
    {
        label: 'Hex8',
        value: 'hex8'
    },
    {
        label: 'hsl',
        value: 'Hsl'
    },
    {
        label: 'hsv',
        value: 'Hsv'
    }
];

// 域名后缀
const domainSuffix :SelectProps['options'] = [
    {value: '.com'}, {value: '.xyz'}, {value: '.net'},
    {value: '.top'}, {value: '.tech'}, {value: 'org'},
    {value: '.gov'}, {value: 'edu'}, {value: '.ink'},
    {value: '.int'}, {value: '.mil'}, {value: '.pub'},
    {value: '.cn'}, {value: '.com.cn'}, {value: '.net.cn'},
    {value: '.gov.cn'}, {value: '.org.cn'}, {value: '.red'},
    {value: '.biz'}, {value: '.CO'}, {value: '.TV'},
    {value: '.info'}, {value: '.name'}, {value: '.mobi'},
    {value: '.travel'}
];

export {
    colorPickerLanguages,
    colorPickerFormat,
    domainSuffix
};
