import app from './lazyload';
import {
    Button,
    Layout,
    Menu,
    Card,
    Row,
    Col,
    Select,
    Form,
    Input,
    Space
} from 'ant-design-vue';

app.use(Button)
    .use(Layout)
    .use(Menu)
    .use(Card)
    .use(Row)
    .use(Col)
    .use(Select)
    .use(Form)
    .use(Input)
    .use(Space);
