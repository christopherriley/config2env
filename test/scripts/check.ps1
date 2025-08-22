function check {
    $envvarname = $args[0]
    $expected = $args[1]
    $actual = Get-Item Env:$envvarname -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Value
    Write-Output "TEST: `$$envvarname - expected: $expected, actual: $actual"

    if (($expected.Length -gt 0 -or $actual.Length -gt 0) -and $expected -ne $actual) {
        Write-Output "test failed: `$$envvarname"
        Write-Output ""
        Write-Output "   expected: '$expected'"
        Write-Output "     actual: '$actual'"
        exit 1
    }
}
