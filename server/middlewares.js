function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) next();
    else next({ status: 403, message: 'Unauthorized' });
}

function imTheUser(req, res, next) {
    console.log('REdirecting', req.user._id, req.params.id);
    if (req.isAuthenticated() && req.user._id === req.params.id) {
        console.log('ITS A MATCH');
        res.redirect('/user-profile');
    } else next();
}

module.exports = {
    isLoggedIn,
    imTheUser
};
