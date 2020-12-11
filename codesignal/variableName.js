function variableName(name) {
    if ( parseInt(name.charAt(0)) > -1) return false;
    return (name.replace(/[^a-zA-Z0-9_]/g, '_') === name)
}
