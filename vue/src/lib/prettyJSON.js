export default function(obj) {

    if(typeof obj == "string"){
        try {
            obj = JSON.parse(obj)
        } catch (error) {
            return false;
        }
    }

    return obj ? valueOf(obj).slice(0, -1)+"</span>" : "";
    
}

function getSpaces(count){
    var spaces = "";
    for (let i = 0; i < count; i++) {
        spaces +="&emsp;&emsp;";
    }
    return spaces;
}

function arrayToString(arr, count = 0, fromObj = false) {

    count++;
    var spaces = getSpaces(count);
    var sp = "&emsp;";
    if(!fromObj) {
        sp = spaces;
    }
    count++;
    var str = `${sp}<span class="__mark">[</span>`;
    
    arr.forEach(el => {
        str += `</span><br>${valueOf(el,count)}`;
    })

    return `${str.slice(0, -1)}</span><br>${spaces}<span class="__mark">],`;
}

function objectToString(obj, count = 0, fromObj = false) {
    
    count++;
    var spaces = getSpaces(count);
    var sp = "&emsp;";
    if(!fromObj) {
        sp = spaces;
    }

    var str = `<span class="__mark">${sp}{</span>`;
    var spacesM = spaces+"&emsp;";

    Object.keys(obj).forEach(k => {
        str += `<br>${spacesM}<span class="__key">"${k}"</span><span class="__mark">:</span>${valueOf(obj[k],count, true)}</span>`;
    })

    str = `${str.slice(0, -1)}</span><br>${spaces}<span class="__mark">},`;
    return str;
}

function valueOf(obj, count = 0, fromObj = false) {

    count++;
    let spaces = getSpaces(count);

    if(fromObj) spaces = "&ensp;";
    let type = obj === null ? "null" : typeof obj;

    switch (type) {
        
        case "object":
            if(Array.isArray(obj)) return arrayToString(obj, count, fromObj)
            return objectToString(obj, count, fromObj);
        
        case "string": return `${spaces}<span class="__string"><b>"${obj}"</b></span><span class="__mark">,`;
        case "boolean": return `${spaces}<span class="__bool">${obj}</span><span class="__mark">,`;

        default: return `${spaces}<span class="__not_string_or_bool">${obj}</span><span class="__mark">,`;

    }

}
