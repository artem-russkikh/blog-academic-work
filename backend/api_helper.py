def Response(result, err_code, err_mes):
    return {
    'result': result, 
    'error':{ 
        'code': err_code,
        'message': err_mes 
    }
    }

not_impemented = Response(None, 0, 'Not implemented')