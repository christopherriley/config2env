function generateJson(inputObj, prefix) {
    let envMap = new Map();

	if (prefix.length > 0) {
		prefix = prefix + "_";
	}

    const m = new Map(Object.entries(inputObj));

    for (const [k, v] of m) {
        const name = prefix + k;

        if (v instanceof Array) {
            throw new Error('key \'' + name + '\': arrays are not supported')
        } else if (typeof v == "string") {
            envMap.set(name,  v);
        } else if (typeof v == "number") {
            envMap.set(name,  "" + v);
        } else if (typeof v == "object") {
            envMap = new Map([...envMap, ...generateJson(v, name)]);
        }
    }

    return envMap;
}

function GenerateJson(rawJson)  {
    try {
	    return generateJson(JSON.parse(rawJson), "");
    } catch (error) {
        throw new Error('failed to parse JSON: ' + error);
    }
}

module.exports = GenerateJson;
