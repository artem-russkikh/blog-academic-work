def Response(result, err_code, err_mes):
    return {
    'result': result, 
    'error':{ 
        'code': err_code,
        'message': err_mes 
    }
    }

def successful(text):
    return Response(text, 0, '')

not_impemented = Response(None, 100, 'Not implemented')
internal_server_error = Response(None, 1, 'Internal server error')
not_authorized = Response(None, 2, 'Not authorized')
not_found = Response(None, 404, 'Not found')


completed = successful('Completed')