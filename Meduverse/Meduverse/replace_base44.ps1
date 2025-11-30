Get-ChildItem -Path "src" -Filter "*.jsx" -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    
    # Replace base44.entities calls with localStorage equivalents
    $content = $content -replace 'base44\.entities\.([A-Za-z]+)\.filter\([^)]+\)', 'localStorage.$1?.get(user.email) || []'
    $content = $content -replace 'base44\.entities\.([A-Za-z]+)\.create\([^)]+\)', 'localStorage.$1?.save(user.email, data)'
    $content = $content -replace 'base44\.entities\.([A-Za-z]+)\.update\([^)]+\)', 'localStorage.$1?.save(user.email, updatedData)'
    $content = $content -replace 'base44\.entities\.([A-Za-z]+)\.delete\([^)]+\)', 'localStorage.$1?.remove(user.email, id)'
    
    # Replace base44.auth calls
    $content = $content -replace 'base44\.auth\.updateMe\([^)]+\)', 'mockAuth.updateUser(data)'
    $content = $content -replace 'base44\.auth\.logout\(\)', 'mockAuth.logout()'
    
    # Replace base44.integrations.Core.InvokeLLM calls
    $content = $content -replace 'base44\.integrations\.Core\.InvokeLLM\(\{[^}]*prompt:\s*([^,}]+)[^}]*\}\)', 'geminiClient.generateContent($1)'
    
    Set-Content -Path $_.FullName -Value $content
}