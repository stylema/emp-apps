const path = require('path')
const packagePath = path.join(path.resolve('./'), 'package.json')
const {dependencies} = require(packagePath)
console.log(packagePath)

module.exports = ({config, env}) => {
  const port = 8003
  const projectName = 'projectName'
  const publicPath = `http://localhost:${port}/`
  // `NODE_ENV` or `BABEL_ENV` environment variables.
  config.resolve.alias.set('@', path.resolve('./', 'src'))
  console.log(env)
  console.log('-------------+++++++++++++');
  config.plugin('mf').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        // 项目名称
        name: projectName,
        // 被远程引入的文件名
        filename: 'emp.js',
        // 远程项目别名:远程引入的项目名
        remotes: {
          '@emp/react-datav': 'empReactDatav@http://localhost:8002/datav.js',
        },
        // 需要暴露的东西
        exposes: {

        },
        shared: {
          react: {eager: true, singleton: true, requiredVersion: '^17.0.2'},
          'react-dom': {eager: true, singleton: true, requiredVersion: '^17.0.2'},
        },
      },
    }
    return args
  })
  config.output.publicPath(publicPath)
  config.devServer.port(port)
  config.devServer.proxy({
    '/api': 'http://115.29.224.69:8080'
  })
  config.plugin('html').tap(args => {
    args[0] = {
      ...args[0],
      ...{
        files: {
          js: ['http://localhost:8002/datav.js'],
        },
      },
    }
    return args
  })
}
