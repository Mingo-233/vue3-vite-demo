// const files = require.context(".", false, /\.ts$/);
const files = import.meta.globEager("./*.ts");
console.log(files);

// interface anyObj {
//   [propName: string]: any;
// }
const modules = {};
for (const key in files) {
  modules[key.replace(/(\.\/|\.ts)/g, "")] = files[key].default;
}

let routers = [];
for (const key in modules) {
  routers = [...routers, ...modules[key].options.routes];
}
// const modules = files.keys().reduce((modules, modulePath) => {
//   console.log(modules);
//   console.log(modulePath);
//   const value = files(modulePath);
//   console.log(value.default);
//   // return { ...modules, ...value.default }
//   return { ...modules, modulePath };
// }, {});

export default routers;
