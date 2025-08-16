package main

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const inputJsonSimple string = `
{
	"name": "chris",
	"age": 27,
	"gpa": 3.84
}
`

const inputJsonNested string = `
{
	"version": {
		"windows": 1.21,
		"linux": 1.22,
		"macos": 1.23
	}
}
`

func TestGenerate(t *testing.T) {

	t.Run("simple json", func(t *testing.T) {
		actual := Generate(inputJsonSimple)

		require.Len(t, actual, 3)

		check(t, actual, "name", "chris")
		check(t, actual, "age", "27")
		check(t, actual, "gpa", "3.84")
	})

	t.Run("nested json", func(t *testing.T) {
		actual := Generate(inputJsonNested)

		require.Len(t, actual, 3)

		check(t, actual, "version_windows", "1.21")
		check(t, actual, "version_linux", "1.22")
		check(t, actual, "version_macos", "1.23")
	})
}

func check(t *testing.T, m map[string]string, key, val string) {
	require.Contains(t, m, key, fmt.Sprintf("key '%s' not found in env map", key))
	assert.Equal(t, val, m[key], fmt.Sprintf("expected key '%s' to have value '%s' - but has value '%s'", key, val, m[key]))
}
