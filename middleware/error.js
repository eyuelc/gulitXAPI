export const error = (err, req, res, next) => {
    if(err.status) {
        res.status(err.status).json({
            'msg': err.message || 'Not Found'
        })
    }else{
        res.status(500).json({
            'msg': err.message || 'Not Found'
        })
    }
    next();
}