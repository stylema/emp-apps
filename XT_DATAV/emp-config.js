const path = require('path')
const packagePath = path.join(path.resolve('./'), 'package.json')
const {dependencies} = require(packagePath)

module.exports = ({config, env, empEnv}) => {
  console.log('empEnv===> 部署环境变量 serve模式不需要该变量', empEnv, env)
  const port = 8002
  const projectName = 'empReactDatav'
  const publicPath = `http://localhost:${port}/`
  config.resolve.alias.set('@', path.resolve('./', 'src'))
  // 设置项目URL
  config.output.publicPath(publicPath)
  // 设置项目端口
  config.devServer.port(port)
  config.devServer.proxy({
    '/api': 'http://topology.le5le.com'
  })
  config.plugin('mf').tap(args => {
    args[0] = {
      ...args[0],
        name: "empReactDatav",
        remotes: {
          "@emp/react-datav": "empReactBase@http://localhost:8002/datav.js"
        },
        exposes: {
          "./components/Hello": "src/components/Hello",
          "./Layout/DataVEditor": "src/Layout/",
        },
        shared:{
          react: {eager: true, singleton: true, requiredVersion: '^17.0.2'},
          'react-dom': {eager: true, singleton: true, requiredVersion: '^17.0.2'},
        },
        // 被远程引入的文件名
        filename: 'datav.js',
    }
    return args
  })
  // 配置 index.html
  config.plugin('html').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        // head 的 title
        title: 'EMP - Project',
        // 远程调用项目的文件链接
        files: {},
      },
    }
    return args
  })
}
