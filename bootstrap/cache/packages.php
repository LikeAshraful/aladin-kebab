<?php return array (
  'albertcht/invisible-recaptcha' => 
  array (
    'providers' => 
    array (
      0 => 'AlbertCht\\InvisibleReCaptcha\\InvisibleReCaptchaServiceProvider',
    ),
  ),
  'artesaos/seotools' => 
  array (
    'providers' => 
    array (
      0 => 'Artesaos\\SEOTools\\Providers\\SEOToolsServiceProvider',
    ),
    'aliases' => 
    array (
      'SEOMeta' => 'Artesaos\\SEOTools\\Facades\\SEOMeta',
      'OpenGraph' => 'Artesaos\\SEOTools\\Facades\\OpenGraph',
      'Twitter' => 'Artesaos\\SEOTools\\Facades\\TwitterCard',
      'JsonLd' => 'Artesaos\\SEOTools\\Facades\\JsonLd',
      'SEO' => 'Artesaos\\SEOTools\\Facades\\SEOTools',
    ),
  ),
  'barryvdh/laravel-debugbar' => 
  array (
    'providers' => 
    array (
      0 => 'Barryvdh\\Debugbar\\ServiceProvider',
    ),
    'aliases' => 
    array (
      'Debugbar' => 'Barryvdh\\Debugbar\\Facades\\Debugbar',
    ),
  ),
  'barryvdh/laravel-dompdf' => 
  array (
    'providers' => 
    array (
      0 => 'Barryvdh\\DomPDF\\ServiceProvider',
    ),
    'aliases' => 
    array (
      'PDF' => 'Barryvdh\\DomPDF\\Facade\\Pdf',
    ),
  ),
  'barryvdh/laravel-snappy' => 
  array (
    'providers' => 
    array (
      0 => 'Barryvdh\\Snappy\\ServiceProvider',
    ),
    'aliases' => 
    array (
      'PDF' => 'Barryvdh\\Snappy\\Facades\\SnappyPdf',
      'SnappyImage' => 'Barryvdh\\Snappy\\Facades\\SnappyImage',
    ),
  ),
  'intervention/image' => 
  array (
    'providers' => 
    array (
      0 => 'Intervention\\Image\\ImageServiceProvider',
    ),
    'aliases' => 
    array (
      'Image' => 'Intervention\\Image\\Facades\\Image',
    ),
  ),
  'jenssegers/agent' => 
  array (
    'providers' => 
    array (
      0 => 'Jenssegers\\Agent\\AgentServiceProvider',
    ),
    'aliases' => 
    array (
      'Agent' => 'Jenssegers\\Agent\\Facades\\Agent',
    ),
  ),
  'laravel/fortify' => 
  array (
    'providers' => 
    array (
      0 => 'Laravel\\Fortify\\FortifyServiceProvider',
    ),
  ),
  'laravel/sail' => 
  array (
    'providers' => 
    array (
      0 => 'Laravel\\Sail\\SailServiceProvider',
    ),
  ),
  'laravel/sanctum' => 
  array (
    'providers' => 
    array (
      0 => 'Laravel\\Sanctum\\SanctumServiceProvider',
    ),
  ),
  'laravel/socialite' => 
  array (
    'providers' => 
    array (
      0 => 'Laravel\\Socialite\\SocialiteServiceProvider',
    ),
    'aliases' => 
    array (
      'Socialite' => 'Laravel\\Socialite\\Facades\\Socialite',
    ),
  ),
  'laravel/tinker' => 
  array (
    'providers' => 
    array (
      0 => 'Laravel\\Tinker\\TinkerServiceProvider',
    ),
  ),
  'laravel/ui' => 
  array (
    'providers' => 
    array (
      0 => 'Laravel\\Ui\\UiServiceProvider',
    ),
  ),
  'laravelcollective/html' => 
  array (
    'providers' => 
    array (
      0 => 'Collective\\Html\\HtmlServiceProvider',
    ),
    'aliases' => 
    array (
      'Form' => 'Collective\\Html\\FormFacade',
      'Html' => 'Collective\\Html\\HtmlFacade',
    ),
  ),
  'maatwebsite/excel' => 
  array (
    'providers' => 
    array (
      0 => 'Maatwebsite\\Excel\\ExcelServiceProvider',
    ),
    'aliases' => 
    array (
      'Excel' => 'Maatwebsite\\Excel\\Facades\\Excel',
    ),
  ),
  'nesbot/carbon' => 
  array (
    'providers' => 
    array (
      0 => 'Carbon\\Laravel\\ServiceProvider',
    ),
  ),
  'nunomaduro/collision' => 
  array (
    'providers' => 
    array (
      0 => 'NunoMaduro\\Collision\\Adapters\\Laravel\\CollisionServiceProvider',
    ),
  ),
  'nunomaduro/termwind' => 
  array (
    'providers' => 
    array (
      0 => 'Termwind\\Laravel\\TermwindServiceProvider',
    ),
  ),
  'nwidart/laravel-modules' => 
  array (
    'providers' => 
    array (
      0 => 'Nwidart\\Modules\\LaravelModulesServiceProvider',
    ),
    'aliases' => 
    array (
      'Module' => 'Nwidart\\Modules\\Facades\\Module',
    ),
  ),
  'renatomarinho/laravel-page-speed' => 
  array (
    'providers' => 
    array (
      0 => 'RenatoMarinho\\LaravelPageSpeed\\ServiceProvider',
    ),
  ),
  'spatie/laravel-backup' => 
  array (
    'providers' => 
    array (
      0 => 'Spatie\\Backup\\BackupServiceProvider',
    ),
  ),
  'spatie/laravel-ignition' => 
  array (
    'providers' => 
    array (
      0 => 'Spatie\\LaravelIgnition\\IgnitionServiceProvider',
    ),
    'aliases' => 
    array (
      'Flare' => 'Spatie\\LaravelIgnition\\Facades\\Flare',
    ),
  ),
  'spatie/laravel-permission' => 
  array (
    'providers' => 
    array (
      0 => 'Spatie\\Permission\\PermissionServiceProvider',
    ),
  ),
  'spatie/laravel-signal-aware-command' => 
  array (
    'providers' => 
    array (
      0 => 'Spatie\\SignalAwareCommand\\SignalAwareCommandServiceProvider',
    ),
    'aliases' => 
    array (
      'Signal' => 'Spatie\\SignalAwareCommand\\Facades\\Signal',
    ),
  ),
  'spatie/laravel-sitemap' => 
  array (
    'providers' => 
    array (
      0 => 'Spatie\\Sitemap\\SitemapServiceProvider',
    ),
  ),
  'spatie/laravel-stripe-webhooks' => 
  array (
    'providers' => 
    array (
      0 => 'Spatie\\StripeWebhooks\\StripeWebhooksServiceProvider',
    ),
  ),
  'spatie/laravel-webhook-client' => 
  array (
    'providers' => 
    array (
      0 => 'Spatie\\WebhookClient\\WebhookClientServiceProvider',
    ),
  ),
  'srmklive/paypal' => 
  array (
    'providers' => 
    array (
      0 => 'Srmklive\\PayPal\\Providers\\PayPalServiceProvider',
    ),
    'aliases' => 
    array (
      'PayPal' => 'Srmklive\\PayPal\\Facades\\PayPal',
    ),
  ),
  'tomfordrumm/jwt-auth' => 
  array (
    'aliases' => 
    array (
      'JWTAuth' => 'Tymon\\JWTAuth\\Facades\\JWTAuth',
      'JWTFactory' => 'Tymon\\JWTAuth\\Facades\\JWTFactory',
    ),
    'providers' => 
    array (
      0 => 'Tymon\\JWTAuth\\Providers\\LaravelServiceProvider',
    ),
  ),
  'yajra/laravel-datatables-buttons' => 
  array (
    'providers' => 
    array (
      0 => 'Yajra\\DataTables\\ButtonsServiceProvider',
    ),
  ),
  'yajra/laravel-datatables-editor' => 
  array (
    'providers' => 
    array (
      0 => 'Yajra\\DataTables\\EditorServiceProvider',
    ),
  ),
  'yajra/laravel-datatables-fractal' => 
  array (
    'providers' => 
    array (
      0 => 'Yajra\\DataTables\\FractalServiceProvider',
    ),
  ),
  'yajra/laravel-datatables-html' => 
  array (
    'providers' => 
    array (
      0 => 'Yajra\\DataTables\\HtmlServiceProvider',
    ),
  ),
  'yajra/laravel-datatables-oracle' => 
  array (
    'providers' => 
    array (
      0 => 'Yajra\\DataTables\\DataTablesServiceProvider',
    ),
    'aliases' => 
    array (
      'DataTables' => 'Yajra\\DataTables\\Facades\\DataTables',
    ),
  ),
);