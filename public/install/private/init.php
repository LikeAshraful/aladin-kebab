<?php

ob_start(); // output buffering is turned on
session_start(); // session is turned on
require_once __DIR__.'/function.php';
require_once __DIR__.'/config.php';
require_once __DIR__.'/EnvatoLicVerify.php';
$envatoLic = new EnvatoLicVerify();

/**
 * Check if the file is installed
 */
check_installed_file();

if (is_post_request()) {
    $data = json_decode(file_get_contents('php://input'), true);

    if (! $data) {
        $data = $_POST;
    }

    switch ($data['action']) {
        case 'envato-license':
            envato_request_validate($data);
            $envatoLic->verify_purchase($data);
            break;
        case 'create .env file':
            //copy .env.example to .env
            copy(base_dir('.env.example'), base_dir('.env'));

            echo json_encode([
                'data' => [],
                'status' => true,
                'message' => '.env file created successfully',
            ]);
            break;
        case 'db-config':
            //copy .env.example to .env
            writeEnvFile([
                'DB_HOST' => $data['DB_HOST'],
                'DB_PORT' => $data['DB_PORT'],
                'DB_DATABASE' => $data['DB_DATABASE'],
                'DB_USERNAME' => $data['DB_USERNAME'],
                'DB_PASSWORD' => $data['DB_PASSWORD'],
            ]);
            $env = readEnvFile();

            if ($env['DB_HOST'] == '' || $env['DB_PORT'] == '' || $env['DB_DATABASE'] == '' || $env['DB_USERNAME'] == '') {
                echo json_encode([
                    'data' => [],
                    'status' => false,
                    'message' => '.env file not configured properly or permission denied. Please check your .env file.',
                ]);
                exit();
            }

            try {
                $connection = mysqli_connect($data['DB_HOST'], $data['DB_USERNAME'], $data['DB_PASSWORD'], $data['DB_DATABASE']);
            } catch (\Throwable $th) {
                echo json_encode([
                    'data' => [],
                    'status' => false,
                    'message' => 'Failed to connect to MySQL: '.mysqli_connect_error(),
                ]);
                exit();
            }

            // Check if the connection was successful
            if (mysqli_connect_errno()) {
                // Connection failed, print the error message
                echo json_encode([
                    'data' => [],
                    'status' => false,
                    'message' => 'Failed to connect to MySQL: '.mysqli_connect_error(),
                ]);
                exit();
            }

            //if db has tables
            $sql = 'SHOW TABLES FROM '.$data['DB_DATABASE'];
            $result = mysqli_query($connection, $sql);

            if (mysqli_num_rows($result) > 0) {
                echo json_encode([
                    'data' => [],
                    'status' => false,
                    'message' => 'Database is not empty',
                ]);
                exit();
            }

            $sqlFile = base_dir('database/database.sql');

            // Read the SQL file into a string
            $sql = file_get_contents($sqlFile);

            // Execute the SQL commands
            if (mysqli_multi_query($connection, $sql)) {
                mysqli_close($connection);
                echo json_encode([
                    'data' => [],
                    'status' => true,
                    'message' => 'Database imported successfully',
                ]);
                session_set('db_configuration', true);
                exit();
            }

            mysqli_close($connection);
            echo json_encode([
                'data' => [],
                'status' => false,
                'message' => 'Database import failed',
            ]);
            // Close the database connection
            break;

        case 'admin-config':
            $env = readEnvFile();
            // connect to database
            $connect = mysqli_connect($env['DB_HOST'], $env['DB_USERNAME'], $env['DB_PASSWORD'], $env['DB_DATABASE'], intval($env['DB_PORT']));

            if (mysqli_connect_errno()) {
                echo json_encode([
                    'data' => [],
                    'status' => false,
                    'message' => 'Database connection failed. Please check your database config.',
                ]);
                exit();
            }

            //         // now create user to users table
            $password = password_hash($data['password'], PASSWORD_DEFAULT);
            try {
                // agent section
                $agent_sql = "INSERT INTO `agents` (`code`, `agent_name`, `agent_email`, `agent_phone`, `status`, `verified_by`, `allowed_user_number`, `cancellation_remarks`, `created_at`, `updated_at`) VALUES ('', '{$data['c_name']}','{$data['email']}', '', '1', NULL, NULL, NULL, NOW(), NOW())";
                $agent_result = mysqli_query($connect, $agent_sql);
                $agent_id = mysqli_insert_id($connect);

                $agent_detail_sql = "INSERT INTO `agent_details` (`agent_id`, `owner_name`, `owner_father_name`, `owner_religion`, `owner_occupation`, `owner_nationality`, `owner_nid_no`, `owner_code`, `deposit_amount`, `cheque_no`, `bank_name`, `civil_aviation_no`, `house`, `road`, `post_office`, `zip_code`, `district`, `country_id`, `witness_1_name`, `witness_2_name`, `witness_3_name`, `witness_1_sign`, `witness_2_sign`, `witness_3_sign`, `nid_img`, `trade_license_img`, `owner_img`, `owner_digital_sign_img`, `civil_aviation_copy`, `agreement_files`, `created_at`, `updated_at`) VALUES ( $agent_id, '{$data['c_name']}', NULL, NULL, NULL, NULL, NULL, '', '0', NULL, NULL, NULL, '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,  NOW(), NOW())";
                $agent_detail_result = mysqli_query($connect, $agent_detail_sql);

                $user_sql = "INSERT INTO `users` (`name`, `email`, `password`, `email_verified_at`, `status`, `agent_id`, `created_at`, `updated_at`) VALUES ('Admin', '{$data['email']}', '{$password}', NOW(), 'Active', $agent_id, NOW(), NOW())";
                $user_result = mysqli_query($connect, $user_sql);
                $user_id = mysqli_insert_id($connect);
            } catch (\Throwable $th) {
                echo json_encode([
                    'data' => [],
                    'status' => false,
                    'message' => 'Admin creation failed. Please try again.',
                ]);
            }

            // $role_sql     = "INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES (1, 'App\\\Models\\\User', {$user_id})";

            // $role_result  = mysqli_query($connect, $role_sql);

            // if ($role_result) {
            try {

                if ($user_result) {
                    fix_env();

                    foreach ($config['symlink_path'] as $target => $link) {
                        create_symlink($target, $link);
                    }

                    // create installed.txt file
                    createInstallFile('installed.php', 'Successfully installed');
                }

            } catch (\Throwable $th) {
                echo json_encode([
                    'data' => [],
                    'status' => false,
                    'message' => 'Symlink and env file permission failed. Please check your env file and symlink path.',
                ]);
                exit();
            }

            echo json_encode([
                'data' => [],
                'status' => true,
                'message' => 'Admin created successfully',
            ]);
            session_set('admin_configuration', true);
            break;

        default:
            echo 'Invalid request';
            break;
    }

    exit();
}
