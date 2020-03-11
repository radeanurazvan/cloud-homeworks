function toElectrikResponse(validation, res, onOk) {
    const firstError = validation.getErrors()[0];
    if (!firstError) {
        onOk();
        return;        
    }

    res.status(400).json({
        error: {
            param: firstError.param,
            message: firstError.message    
        }
    });
    return;
}

module.exports = {
    toElectrikResponse
};