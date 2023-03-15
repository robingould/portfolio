<html>
    <head>
        <meta charset="utf-8">
        <title>generating code.. will it work? o.0</title>
        <body>
        <?php
            if (isset($_GET['access_token'])) {
                // user has authenticated
                $query_params = '';
                parse_str($_SERVER['QUERY_STRING'], $params);
                $query_params = http_build_query([
                    'access_token' => $_GET['access_token'],
                    'state' => $_GET['state'] ?? ''
                ]);
            header('Location: success.php?' . $query_params);
            exit;
            }
            else if (isset($_GET['error'])){
                // authentication has been denied ;_;
                header('Location: failure.php');
                exit;
            }
            else {
                // redirect to default error page
                header('Location: error.php');
                exit;
            }
            
        ?>
