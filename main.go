package main

import (
	"bufio"
	"flag"
	"fmt"
	"os"
	"strings"
)

func main() {
	flagInputFile := flag.String("in", "", "input json file")
	flag.Parse()

	var rawInput string

	if len(strings.TrimSpace(*flagInputFile)) == 0 {
		os.Stderr.WriteString("input file was not specified - reading from stdin\n\n")
		for scanner := bufio.NewScanner(os.Stdin); scanner.Scan(); {
			rawInput += scanner.Text()
		}
	} else {
		fmt.Fprintf(os.Stderr, "reading input from file '%s'\n\n", *flagInputFile)
		rawBytes, err := os.ReadFile(*flagInputFile)
		if err != nil {
			fmt.Printf("failed to read input file: %s\n", err)
			os.Exit(1)
		}

		rawInput = string(rawBytes)
	}

	if m, err := GenerateJson(rawInput); err == nil {
		for k, v := range m {
			fmt.Printf("%s=%s\n", k, v)
		}
		os.Exit(0)
	}

	os.Stderr.WriteString("failed to process input using any known format\n\n")
	os.Exit(1)
}
