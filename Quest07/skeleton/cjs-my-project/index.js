// TODO: cjs-package와 esm-package의 함수와 클래스들을 가져다 쓰고 활용하려면 어떻게 해야 할까요?
const { cjsUtilFunction, CjsUtilClass } = require("../cjs-package/index");

(async () => {
  const { esmUtilFunction, EsmUtilClass } = await import(
    "./../esm-package/index.mjs"
  );
  console.log(esmUtilFunction("jusung"));
})();

console.log(cjsUtilFunction("knowre"));
