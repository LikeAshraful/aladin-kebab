<html>
    <style>
        .button-class
        {
                box-sizing: border-box;
                font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';
                border-radius: 4px;
                color: #fff;
                display: inline-block;
                overflow: hidden;
                text-decoration: none;
                background-color: #2d3748;
                border-bottom: 8px solid #2d3748;
                border-left: 18px solid #2d3748;
                border-right: 18px solid #2d3748;
                border-top: 8px solid #2d3748;
        }
    </style>
    <body>
        <div>
            <p>@lang('Hi !')</p>
            <p> @lang('Password Reset Verification Code') : <strong>{{@$token}}</strong></p>
            <br/>
            <br/>
            <strong> @lang('Thank you')</strong>
        </div>
    </body>
</html>
