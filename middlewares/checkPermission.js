exports.checkPermission = (user, focusArea) => {
    const { role, area } = user;
    return role === 'admin' || area === focusArea;
};
