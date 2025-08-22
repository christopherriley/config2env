#!/usr/bin/env bash

check() {
    env_var_name=$1
    val_expected=$2

    echo "TEST: \$$env_var_name - expected: $val_expected, actual: ${!env_var_name}"

    if [ ! "${!env_var_name}" == "$val_expected" ]; then
        echo "test failed: \$$env_var_name"
        echo
        echo "   expected: $val_expected"
        echo "     actual: ${!env_var_name}"
        exit 1
    fi
}
