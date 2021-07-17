export class EsmUtilClass {
    constructor(foo) {
        this.foo = foo;
    }

    double() {
        return foo * 2;
    }
}

export const esmUtilFunction = str => {
    return str.toUpperCase();
};

// TODO: 다른 패키지가 EsmUtilClass와 esmUtilFunction를 가져다 쓰려면 어떻게 해야 할까요?
