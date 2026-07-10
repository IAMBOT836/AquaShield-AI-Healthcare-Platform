# setup.ps1
# AquaShield AI Environment Setup Script for Windows (PowerShell)

$ErrorActionPreference = "Stop"

Write-Host "=== Setting up path for uv ==="
$uvPath = "$env:USERPROFILE\.local\bin"
if (Test-Path "$uvPath\uv.exe") {
    $env:PATH = "$uvPath;" + $env:PATH
    Write-Host "uv found at $uvPath"
} else {
    Write-Host "uv not found yet. It should be installing via background task."
}

Write-Host "=== Setting up portable Node.js ==="
$nodeDir = "$env:USERPROFILE\AppData\Local\Programs\node"
$nodeDest = "$nodeDir\node-v20.11.1-win-x64"
$nodeZip = "$env:TEMP\node-v20.11.1-win-x64.zip"

if (!(Test-Path $nodeDest)) {
    if (!(Test-Path $nodeDir)) {
        New-Item -ItemType Directory -Path $nodeDir -Force | Out-Null
    }
    Write-Host "Downloading portable Node.js v20.11.1..."
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v20.11.1/node-v20.11.1-win-x64.zip" -OutFile $nodeZip
    Write-Host "Extracting Node.js..."
    Expand-Archive -Path $nodeZip -DestinationPath $nodeDir -Force
    Remove-Item -Path $nodeZip -Force
    Write-Host "Node.js extracted to $nodeDest"
} else {
    Write-Host "Node.js is already present at $nodeDest"
}

# Update PATH for this script session
$env:PATH = "$nodeDest;" + $env:PATH
Write-Host "Node.js path verified:"
node -v
npm -v

Write-Host "=== Setting up Python 3.11 Virtual Environment via uv ==="
# Ensure uv is functional
& uv --version

Write-Host "Installing Python 3.11..."
& uv python install 3.11

Write-Host "Creating Python venv in backend/.venv..."
if (!(Test-Path "backend")) {
    New-Item -ItemType Directory -Path "backend" -Force | Out-Null
}
& uv venv backend/.venv --python 3.11

Write-Host "Virtual environment configured. Setup complete."
