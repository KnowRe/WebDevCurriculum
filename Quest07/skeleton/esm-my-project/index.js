// TODO: cjs-package와 esm-package의 함수와 클래스들을 가져다 쓰고 활용하려면 어떻게 해야 할까요?
import { EsmUtilClass, esmUtilFunction } from "../esm-package/index.mjs";
import { cjsUtilFunction, CjsUtilClass } from "../cjs-package/index.js";

console.log(esmUtilFunction('knowre'));
console.log(cjsUtilFunction('jusung'));
