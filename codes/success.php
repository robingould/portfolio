<html>
    <head>
        <meta charset="utf-8">
        <title>WE DID IT YAY OMG !! 0.0</title>
    </head>
    <body>
        <?php
        // get access token from URL
        $access_token = $_GET['access_token'];

        // url to GET channel_ID
        $url = 'https://api.twitch.tv/helix/users';

        //headers
        $headers = array(
            'client_id' . '8khtls8dc9mor80o1sp0wlx5bofig9',
            'Authorization: Bearer '. $access_token,
        );

        $ch = curl_init();

        // curl options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $channel_id = curl_exec($ch);

        curl_close($ch);
        echo '<p>' . $channel . '</p>';
        echo '<p>' . $access_token . '</p>'
        ?>

    </body>
 </html>