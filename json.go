package main

import (
	"encoding/json"
	"fmt"
	"math"
	"strconv"
	"strings"
)

func generate(inputMap map[string]any, envMap map[string]string, prefix string) {
	prefix = strings.TrimSpace(prefix)
	if len(prefix) > 0 {
		prefix = fmt.Sprintf("%s_", prefix)
	}

	for k, v := range inputMap {
		name := fmt.Sprintf("%s%s", prefix, k)

		switch v := v.(type) {
		case string:
			envMap[name] = v
		case float64:
			if v == math.Trunc(v) {
				envMap[name] = fmt.Sprintf("%d", int(v))
			} else {
				envMap[name] = strconv.FormatFloat(v, 'f', -1, 64)
			}
		case map[string]any:
			generate(v, envMap, name)
		case []any:
			panic(fmt.Sprintf("key '%s': arrays are not supported", name))
		default:
			panic(fmt.Sprintf("key: '%s': unknown type", name))
		}
	}
}

func Generate(rawJson string) map[string]string {
	envMap := make(map[string]string)

	var rawJsonMap map[string]any
	if err := json.Unmarshal([]byte(rawJson), &rawJsonMap); err != nil {
		panic(fmt.Sprintf("failed to unmarshal input json: %s", err))
	}

	generate(rawJsonMap, envMap, "")

	return envMap
}
