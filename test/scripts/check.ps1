function check {
    Write-Output "check(): enter"

    $envvarname = $args[0]
    $expected = $args[1]
    $actual = Get-Variable -Scope Global -Name $envvarname -ValueOnly
    Write-Output "TEST: `$$envvarname - expected: $expected, actual: $actual"

    if ($expected -ne $actual) {
        Write-Output "test failed: `$$envvarname"
        Write-Output ""
        Write-Output "   expected: $expected"
        Write-Output "     actual: $actual"
        exit 1
    }
}
