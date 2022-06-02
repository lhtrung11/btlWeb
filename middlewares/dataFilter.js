exports.removeEmptyValue = (obj) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key] === "") {
            delete obj[key];
        }
    });
    return obj;
};

exports.removeInvalidKey = (obj, arr) => {
    let newObj = Object.keys(obj)
        .filter((key) => arr.includes(key))
        .reduce((o, key) => {
            o[key] = obj[key];
            return o;
        }, {});
    return newObj;
};

exports.correctDataType = (obj, typeObj) => {
    let newObj = Object.keys(obj)
        .filter((key) => Object.keys(typeObj).includes(key))
        .reduce((o, key) => {
            switch (typeObj[key]) {
                case "boolean":
                    o[key] = obj[key] === "true";
                    break;
                case "number":
                    o[key] = parseInt(obj[key]);
                    break;
                default:
                    o[key] = obj[key];
                    break;
            }
            return o;
        }, {});
    return newObj;
};
