isValidObject = function(obj, type) {
    //Check all.
    if(typeof(type) === "undefined" || type !== "undefined" || type === null || type === ''){
        if(typeof(obj) !== "undefined" && obj !== null && obj !== '')
        {return true}
        else
        {return false}
    }

    //Check undefined only.
    else
    {
        if(typeof(obj) !== "undefined")
        {return true}
        else
        {return false}
    }
},

isRequiredObject = function(obj, probs) {
    //Check mandatories. fields accessed(true), none params(false), or return list of missing;
    if("undefined" === typeof(probs.length) || "undefined" === typeof(obj))
    { return false }
    var listRequired = [];

    probs.forEach(el => {
        if(!this.isValidObject(obj[el])){
            listRequired.push(el);
        }
    });

    if(listRequired.length == 0){ return true }
    else { return listRequired }
},

isDefinedObject = function(obj, probs) {
    var listDefined = [];
    probs.forEach(el => {
        if(this.isValidObject(obj[el], "undefined")){
            listDefined.push(el);
        }
    });
    return listDefined;
}

module.exports = { isValidObject, isRequiredObject, isDefinedObject }