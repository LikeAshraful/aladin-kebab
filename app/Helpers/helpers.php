<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Modules\Setting\Entities\AppSettingBank;

/**
 * get setting value
 */
function setting(string $key, ?string $default = null, bool $file = false): ?string
{
    $data = Modules\Setting\Facades\Setting::get($key);

    if ($file && $data) {
        return storage_asset($data);
    }

    return $data ?? $default;
}

/**
 * generate asset url
 */
function custom_asset(?string $file = null, ?string $default = null, ?string $path = null): string
{
    if ($file) {
        return app('url')->asset($path.'/'.$file.'?v=1');
    }

    return $default;
}

/**
 * storage asset url
 *
 * @param  string  $file
 * @param  string  $default
 */
function storage_asset($file = null, $default = null): string
{
    return custom_asset($file, $default, 'storage');
}

/**
 * admin asset url
 *
 * @return mixed
 */
function admin_asset(?string $file = null, ?string $default = null): string
{
    return custom_asset($file, $default, 'admin-assets');
}

/**
 * nanopkg asset url
 */
function nanopkg_asset(?string $file = null, ?string $default = null): string
{
    return custom_asset($file, $default, 'nanopkg-assets');
}

/**
 * module asset url
 */
function module_asset(?string $file = null, ?string $default = null): string
{
    return custom_asset($file, $default, 'module-assets');
}
/**
 * front asset url
 */
function front_asset(?string $file = null, ?string $default = null): string
{
    return custom_asset($file, $default, 'front-assets');
}

/**
 * upload asset url
 *
 * @param  string  $file
 * @param  string  $default
 */
function upload_asset($file, $default = null): string
{
    return custom_asset($file, $default, 'storage');
}

/**
 * check if the current user has permission
 *
 * @param  mixed  $permission
 */
function can($permission): bool
{
    return auth()->user()->can($permission);
}

/**
 * has role check
 *
 * @param  mixed  $role
 * @param  mixed  $user
 * @return mixed
 */
function has_role($role, $user = null)
{
    if ($user != null) {
        return $user->hasRole($role);
    }

    return auth()->user()->hasRole($role);
}

/**
 * permission check
 *
 * @param  mixed  $permissions
 * @param  mixed  $permission_id
 * @return bool
 */
function permission_check($permissions, $permission_id)
{
    foreach ($permissions as $permission) {
        if ($permission->id == $permission_id) {
            return true;
        }
    }

    return false;
}

/**
 * get permission name from key
 *
 * @param  mixed  $data
 * @return string
 */
function permission_key_to_name($data)
{
    return ucwords(implode(' ', explode('_', $data)));
}

/**
 * Upload file in storage and delete old file
 *
 * @param  mixed  $request
 * @param  mixed  $fileName
 * @param  mixed  $folderName
 * @param  mixed  $oldImage
 * @return mixed
 */
function upload_file($request, $fileName, $folderName, $oldImage = false)
{
    if ($request->has($fileName)) {
        $request->validate([
            $fileName => ['required', 'file'],
        ]);
        if ($oldImage) {
            Storage::delete($oldImage);
        }

        return $request->$fileName->store($folderName);
    }

    return $oldImage;
}

/**
 * Store file in storage
 *
 * @param  mixed  $file
 * @return bool|string
 */
function store_file($file, string $path = 'image')
{
    return Illuminate\Support\Facades\Storage::putFile($path, $file);
}

/**
 * Delete file from storage
 *
 * @param  mixed  $path
 * @return bool
 */
function delete_file($path)
{
    if ($path && Storage::disk('public')->exists($path)) {
        return Storage::delete($path);
    }
}
/**
 * equal to data == value return selected
 *
 * @param  mixed  $data
 * @param  mixed  $value
 * @return string
 */
function selected($data, $value = null, $case = true)
{
    if (is_array($data)) {
        return in_array($value, $data) ? 'selected' : '';
    } else {
        if ($case) {
            return strtolower($data) == strtolower($value) ? 'selected' : '';
        } else {
            return $data == $value ? 'selected' : '';
        }
    }
}

/**
 * equal to data == value return selected
 *
 * @param  mixed  $data
 * @param  mixed  $value
 * @return string
 */
function checked($data, $value = null, $case = true)
{
    if (is_array($data)) {
        return in_array($value, $data) ? 'checked' : '';
    } else {
        if ($case) {
            return strtolower($data) == strtolower($value) ? 'checked' : '';
        } else {
            return $data == $value ? 'checked' : '';
        }
    }
}

/**
 * get the previous url
 *
 * @return Illuminate\Config\Repository|mixed|string
 */
function back_url()
{
    return url()->current() == url()->previous() ? config('app.url') : url()->previous();
}

/**
 * To set config
 *
 * @param  mixed  $name
 * @param  mixed  $data
 */
function config_set($name, $data): void
{
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            Illuminate\Support\Facades\Config::set($name.'.'.$key, $value);
        }
    } else {
        Illuminate\Support\Facades\Config::set($name, $data);
    }
}

/**
 * To set config and seo
 *
 * @param  mixed  $name
 * @param  mixed  $data
 */
function cs_set($name, $data): void
{
    config_set($name, $data);
    Artesaos\SEOTools\Facades\SEOMeta::setTitle(config('theme.title'))
        ->setDescription(config('theme.description'));
    Artesaos\SEOTools\Facades\OpenGraph::setDescription(config('theme.description'))->setTitle(config('theme.title'));
    Artesaos\SEOTools\Facades\JsonLd::addImage(config('theme.images'));
}

/**
 * To generate OTP
 *
 * @param  int  $digits
 * @return null|int
 */
function generateOTP($digits = 4)
{
    $i = 0;
    $pin = null;
    while ($i < $digits) {
        $pin .= mt_rand(0, 9);
        $i++;
    }

    return $pin;
}

if (! function_exists('image_url')) {
    function image_url($path, $default_image = null)
    {
        if ($path) {
            return storage_asset($path);
        }

        return $default_image;
    }
}

/**
 *  To pad integer
 *
 * @param  int  $number
 * @param  mixed  $pad_string
 * @param  int  $pad_length
 * @return string
 */
function int_pad($number, $pad_string = '0', $pad_length = 4)
{
    return str_pad($number, $pad_length, $pad_string, STR_PAD_LEFT);
}

/**
 * To Lower Case String
 *
 * @return string
 */
function str_lower(string $value)
{
    return Str::lower($value);
}

/**
 * To check route is active or not and return active class
 *
 * @return mixed
 */
function active_menu(string $uri = '', mixed $output = 'active')
{
    if (Request::url() == $uri || Request::is(Request::segment(1).'/'.$uri) || Request::is($uri)) {
        return $output;
    }

    return '';
}

/**
 * To Check laravel module active
 *
 * @param  mixed  $name
 * @return bool
 */
function module_active($name)
{
    return Nwidart\Modules\Facades\Module::find($name)?->isEnabled();
}

/**
 * Convert size to human readable format (KB, MB, GB, TB, PB)
 */
function size_convert(int $size): string
{
    $unit = ['b', 'kb', 'mb', 'gb', 'tb', 'pb'];

    return @round($size / pow(1024, ($i = floor(log($size, 1024)))), 2).' '.$unit[$i];
}

function lang_setting()
{
    return Modules\Language\Entities\Language::cacheData();
}

/**
 * Read the contents of a .env file into an array
 *
 * @param  mixed  $path
 * @return array<string>
 */
function readEnvFile($path = __DIR__.'/../../.env')
{
    // Open the .env file for reading
    $file = fopen($path, 'r');
    // Initialize an empty array to store the keys and values
    $env = [];
    // Loop through each line in the file
    while (($line = fgets($file)) !== false) {
        // Ignore any comment lines
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        // Extract the key and value from the line
        $parts = explode('=', trim($line), 2);
        if (count($parts) !== 2) {
            continue;
        }
        $key = $parts[0];
        $value = trim($parts[1], '"\''); // Remove quotes from value

        // Add the key and value to the array
        $env[$key] = $value;
    }
    // Close the file
    fclose($file);

    // Return the array
    return $env;
}

/**
 * Write an array of key/value pairs to a .env file
 *
 * @param  array<string>  $env
 * @param  mixed  $path
 */
function writeEnvFile(array $env, $path = __DIR__.'/../../.env'): void
{

    $str = file_get_contents($path);

    //  replace the value of the specific key or create a new key
    foreach ($env as $key => $value) {
        // if value is true or false
        if ($value == 'true' || $value == 'false') {
            $key_value = "$key=$value";
        } else {
            $key_value = "$key='$value'";
        }
        // check if key exists
        if (strpos($str, $key) !== false) {
            $str = preg_replace("/^$key=.*/m", $key_value, $str);
        } else {
            $str .= $key_value.PHP_EOL;
        }
    }
    file_put_contents($path, $str);
    // forget mail config cache
    \Illuminate\Support\Facades\Artisan::call('config:cache');
}

function vite($entry, $initPath = 'build/', $manifest = null)
{
    $manifest = $manifest ?? public_path('build/manifest.json');
    if (\Illuminate\Support\Facades\File::exists($manifest)) {
        $manifest = json_decode(\Illuminate\Support\Facades\File::get($manifest), true);
        $entrypoint = $manifest[$entry]['file'] ?? $entry;

        return asset($initPath.$entrypoint);
    }

    throw new \Exception('The Vite manifest does not exist. Please run `npm run dev` or `npm run build`.');
}

/**
 * Json File Seed
 *
 * @param  mixed  $model
 * @param  mixed  $jsonPath
 */
function json_seed($model, $jsonPath = __DIR__.'/data.json'): void
{
    $data = json_decode(file_get_contents($jsonPath), true);
    $model->truncate();
    $model->insert($data ?? []);
}

/**
 * Json to Jsonl converter
 *
 * @param  mixed  $path
 * @param  mixed  $savePath
 */
function json_to_jsonl($path, $savePath): void
{
    $data = json_decode(file_get_contents($path), true);
    $file = fopen($savePath, 'w');
    foreach ($data as $line) {
        fwrite($file, json_encode($line).PHP_EOL);
    }
    fclose($file);
}

/**
 * Skip Script Tag from input
 *
 * @param  mixed  $input
 * @return mixed
 */
function stripScriptsTag($input)
{
    array_walk_recursive($input, function (&$value) {
        if (is_string($value)) {
            $value = str_replace(['<script>', '</script>', '&lt;script&gt;', '&lt;/script&gt;'], '', $value);
        }
    });

    return $input;
}

// return success response
if (! function_exists('sendSuccessResponse')) {
    function sendSuccessResponse($message, $result, $code = 200)
    {
        $resposnse = [
            'status' => true,
            'code' => $code,
            'message' => $message,
            'data' => $result,
        ];

        return response()->json($resposnse, $code);
    }
}

// return errore Response
if (! function_exists('sendErrorResponse')) {
    function sendErrorResponse($errorMessage, $errorData = null, $code = 404)
    {

        $resposnse = [
            'status' => false,
            'code' => $code,
            'message' => $errorMessage,
            'data' => @$errorData,
        ];

        return response()->json($resposnse, $code);
    }
}

if (! function_exists('uniqueId')) {

    function uniqueId($table_name, $prefix)
    {

        $data = DB::table($table_name)->max('id');
        if ($data > 0) {
            return $code = @$prefix.$data + 1;
        } else {
            return $code = @$prefix.'1';
        }
    }
}

if (! function_exists('delete_msg')) {
    function deleteMsg()
    {
        return 'Are you sure want to delete?';
    }
}

if (! function_exists('dataPrint')) {
    function dataPrint($object, $property)
    {
        return $object ? $object[$property] : '---';
    }
}

// send firebase notifications
if (! function_exists('set_push_notification')) {
    function set_push_notification($title, $body, $user_id, $data = null)
    {
        // info('set_push_notification - '.$user_id);
        $device_token = \DB::table('jp_user_online')->where('user_id', $user_id)->pluck('device_token')->all();
        $SERVER_API_KEY = 'key=AAAAUW_Uf9A:APA91bEaFxcMpmfTvBpnZJ1uRvOGxuhhOTqeeLDHFeSFmLQ6oA343W27K6St-_JmjG7R2GgAENGDOBI-iH3qaJa0RVUqNY6IQj55N3JUg43tk7qpiQHiNCVNzNgrbUtrO8HnmNg7HmY5';

        $data = [
            'registration_ids' => $device_token,
            'notification' => [
                'title' => $title,
                'body' => $body,
                'content_available' => true,
                'priority' => 'high',
            ],
            'data' => $data,
        ];

        // info('notification data'.json_encode($data));

        $response = Http::withHeaders([
            'Authorization' => $SERVER_API_KEY,
            'Content-Type' => 'application/json',
        ])->post('https://fcm.googleapis.com/fcm/send', $data);

        if ($response->status() == 200) {
            $res = $response->json();

            if ($res['success'] == 0) {
                info('success'.$res['results'][0]['error']);

                return response()->json([
                    'success' => false,
                    'message' => $res['results'][0]['error'],
                ]);
            }
            info('regular '.$res['results'][0]['message_id']);

            return response()->json([
                'success' => true,
                'message_id' => $res['results'][0]['message_id'],
            ]);
        } else {
            info('found issue on notificaiton');

            return response()->json([
                'success' => false,
                'message' => 'Try again later',
            ]);
        }
    }
}

if (! function_exists('set_push_notification_by_topic')) {
    function set_push_notification_by_topic($title, $body, $topic)
    {
        $SERVER_API_KEY = 'AAAAUW_Uf9A:APA91bEaFxcMpmfTvBpnZJ1uRvOGxuhhOTqeeLDHFeSFmLQ6oA343W27K6St-_JmjG7R2GgAENGDOBI-iH3qaJa0RVUqNY6IQj55N3JUg43tk7qpiQHiNCVNzNgrbUtrO8HnmNg7HmY5';

        $data = [
            'to' => '/topics/'.$topic,
            'notification' => [
                'title' => $title,
                'body' => $body,
                'channelId' => 'rocket_answer',
            ],
            'data' => [
                'title' => $title,
                'body' => $body,
                'channelId' => 'rocket_answer',
            ],
        ];

        $response = Http::withHeaders([
            'Authorization' => 'key='.$SERVER_API_KEY,
            'Content-Type' => 'application/json',
        ])->post('https://fcm.googleapis.com/fcm/send', $data);
        if ($response->status() == 200) {
            $res = $response->json();
            if (! array_key_exists('message_id', $res)) {
                return response()->json([
                    'success' => false,
                    'message' => $res['results'][0]['error'],
                ]);
            }

            return response()->json([
                'success' => true,
                'message_id' => $res['message_id'],
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Try again later',
            ]);
        }
    }
}

/**********************
 *  New helpers for trip
 ***********************/

if (! function_exists('all_banks')) {
    function all_banks()
    {
        return Cache::rememberForever(AppSettingBank::CACHE_KEY, function () {
            return AppSettingBank::all();
        });
    }
}

if (! function_exists('uploadAsset')) {
    function uploadAsset($key, $path = 'uploads')
    {
        $request = request();
        if ($request->hasFile($key)) {
            $file = $request->file($key);
            $fileName = time().'_'.$file->getClientOriginalName();
            $filePath = $file->storeAs($path, $fileName, 'public');

            return $filePath;
        } else {
            return null;
        }
    }
}

if (! function_exists('removeAsset')) {
    function removeAsset($path)
    {
        if (Storage::exists($path)) {
            Storage::delete($path);

            return true;
        }

        return false;
    }
}

function formatMinutes($minutes)
{
    $hours = floor($minutes / 60);
    $remainingMinutes = $minutes % 60;

    $formattedTime = '';
    if ($hours > 0) {
        $formattedTime .= $hours.'hr';
    }
    if ($remainingMinutes > 0) {
        $formattedTime .= ($formattedTime != '' ? ' ' : '').$remainingMinutes.'min';
    }

    return $formattedTime;
}

function convertTimeFormat($inputDatetime, $outputFormat = 'H:i:s')
{
    $carbon = Carbon::parse($inputDatetime);
    $formattedTime = $carbon->format($outputFormat);

    return $formattedTime;
}

function getArrivalDateTime($departureDate, $time, $duration)
{
    $departureDateTime = Carbon::parse($departureDate.'T'.$time);
    $arrivalDateTime = $departureDateTime->addMinutes($duration);

    return $arrivalDateTime;
}

function getCabinClassFullName(string $classCode = 'Y')
{
    switch ($classCode) {
        case 'Y':
            return 'Economy';
        case 'S':
            return 'Premium Economy';
        case 'C':
            return 'Business';
        case 'J':
            return 'Premium Business';
        case 'F':
            return 'First';
        case 'P':
            return 'Premium First';
        default:
            return 'Economy';
    }
}
function itineraryTimeConversion($time)
{
    // 08:15:00+06:00 to T18:50:00
    return 'T'.\Carbon\Carbon::parse($time)->format('H:i:s');
}
function getAirlineInfoByCode(string $airCode = 'BG')
{
    $cacheKey = 'airlines_info';
    $filePath = public_path('json/airlines.json');
    $airlines = Cache::rememberForever($cacheKey, function () use ($filePath) {
        return collect(json_decode(File::get($filePath), true));
    });
    $airLineInfo = (object) $airlines->firstWhere('code', $airCode);

    return $airLineInfo;
}

function getAirportInfoByCode(?string $airportCode)
{
    if ($airportCode === null) {
        return null;
    }

    $cacheKey = 'airports_info';
    $filePath = public_path('json/airports.json');
    $airports = Cache::rememberForever($cacheKey, function () use ($filePath) {
        return collect(json_decode(File::get($filePath), true)['airports']);
    });

    return (object) $airports->firstWhere('value', $airportCode);
}

function getLayoverTime($arrivalDateTime, $departureDateTime)
{
    $arrivalTime = Carbon::parse($arrivalDateTime);
    $departureTime = Carbon::parse($departureDateTime);
    $layoverTime = $departureTime->diffInMinutes($arrivalTime);

    return $layoverTime;
}

function calculateTotalDuration(int $duration, int $layOffTime): int
{
    // return $duration + $layOffTime;
    return $duration;
}

function getStopInfo(int $stops = 0): string
{
    switch ($stops) {
        case 0:
            return 'NonStop';
        case 1:
            return 'OneStop';
        default:
            return 'MultiStop';
    }
}

function extractNum($stringWithNumber)
{
    $matches = [];
    preg_match('/([A-Za-z]+)(\d+)/', $stringWithNumber, $matches);

    return (int) $matches[2];
}

function galileo_xml_to_json($xml)
{
    $xml = str_replace(['SOAP-ENV:', 'air:', 'SOAP:', 'common_v50_0:', ':SOAP', 'universal:'], '', $xml);
    $xml = simplexml_load_string($xml);

    $json = json_encode($xml);
    $array = json_decode($json, true);

    return $array;
}
