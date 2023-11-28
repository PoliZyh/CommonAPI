const path = require('path')

const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter');

const errHandler = require('./errHandler')
const router = require('../router');

const app = new Koa();

app.use(koaBody({
    multipart: true,
    formidable: {
        // 在配置选项option里，不推荐使用相对路径
        // 在option里的相对路径不是相对当前文件，相对process.cwd()进程
        uploadDir: path.join(__dirname, '../upload'), // 上传的文件放到哪个路径下
        keepExtensions: true, // 保持扩展名
        // 上传成功后将会挂在到ctx.request.files中
    }
}));
// 设置文件夹为静态资源文件夹（能够通过localhost进行访问）
app.use(KoaStatic(path.join(__dirname, '../upload')))
app.use(parameter(app));

app.use(router.routes()).use(router.allowedMethods());

// 统一错误处理
app.on('error', errHandler)

module.exports = app;