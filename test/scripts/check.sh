#!/usr/bin/env bash

check() {
    env_var_name=$1
    val_expected=$2
    val_actual=${!env_var_name}

    echo "TEST: \$$env_var_name - expected: $val_expected, actual: $val_actual"

    if [ ! "$val_actual" == "$val_expected" ]; then
        echo "test failed: \$$env_var_name"
        echo
        echo "   expected: $val_expected"
        echo "     actual: $val_actual"
        exit 1
    fi
}
