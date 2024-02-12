-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 10, 2024 at 08:58 AM
-- Server version: 8.0.36-0ubuntu0.20.04.1
-- PHP Version: 8.1.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `subah_fresh`
--

-- --------------------------------------------------------

--
-- Table structure for table `agents`
--

CREATE TABLE `agents` (
  `id` bigint UNSIGNED NOT NULL,
  `code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `agent_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `agent_email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `agent_phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT '2',
  `verified_by` int DEFAULT NULL,
  `allowed_user_number` int DEFAULT NULL,
  `cancellation_remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `agent_categories`
--

CREATE TABLE `agent_categories` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `icon_path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `agent_details`
--

CREATE TABLE `agent_details` (
  `id` bigint UNSIGNED NOT NULL,
  `agent_id` int NOT NULL,
  `owner_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_father_name` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_religion` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_occupation` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_nationality` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_nid_no` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_code` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deposit_amount` double NOT NULL DEFAULT '0',
  `cheque_no` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `civil_aviation_no` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `house` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `road` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_office` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip_code` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_id` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `witness_1_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `witness_2_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `witness_3_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `witness_1_sign` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `witness_2_sign` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `witness_3_sign` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nid_img` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trade_license_img` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_img` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_digital_sign_img` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `civil_aviation_copy` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agreement_files` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `agent_payment_setups`
--

CREATE TABLE `agent_payment_setups` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `agent_pay_accounts`
--

CREATE TABLE `agent_pay_accounts` (
  `id` bigint UNSIGNED NOT NULL,
  `agent_id` int NOT NULL,
  `card_type_id` int NOT NULL,
  `payment_method_id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `valid_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `agent_reviews`
--

CREATE TABLE `agent_reviews` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` int NOT NULL,
  `agent_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `review` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `agent_sub_categories`
--

CREATE TABLE `agent_sub_categories` (
  `id` bigint UNSIGNED NOT NULL,
  `agent_category_id` int NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `icon_path` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `agent_withdraw_requests`
--

CREATE TABLE `agent_withdraw_requests` (
  `id` bigint UNSIGNED NOT NULL,
  `agent_id` int NOT NULL,
  `request_amount` double(10,2) NOT NULL,
  `request_date` date NOT NULL,
  `is_approve` tinyint NOT NULL DEFAULT '0',
  `approve_by` int NOT NULL,
  `approved_date` datetime NOT NULL,
  `card_type_id` int NOT NULL,
  `card_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `valid_date` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `air_tickets`
--

CREATE TABLE `air_tickets` (
  `id` bigint UNSIGNED NOT NULL,
  `is_cancelled` tinyint(1) NOT NULL DEFAULT '0',
  `is_rejected` tinyint(1) NOT NULL DEFAULT '0',
  `commission_amount` double DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `total_payment` double DEFAULT NULL,
  `payment_currency` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'BDT',
  `issued_by_id` bigint UNSIGNED DEFAULT NULL,
  `issued_company_id` bigint UNSIGNED DEFAULT NULL,
  `pnr_id` bigint UNSIGNED NOT NULL,
  `updated_by_id` bigint UNSIGNED DEFAULT NULL,
  `is_cancel_req` tinyint(1) NOT NULL DEFAULT '0',
  `is_dump` tinyint(1) NOT NULL DEFAULT '0',
  `refund_request` tinyint(1) NOT NULL DEFAULT '0',
  `has_update` tinyint(1) NOT NULL DEFAULT '0',
  `reissue_request` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `air_ticket_details`
--

CREATE TABLE `air_ticket_details` (
  `id` bigint UNSIGNED NOT NULL,
  `passenger_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ticket_number` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ticket_price` double NOT NULL,
  `price_currency` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'BDT',
  `air_id` bigint UNSIGNED NOT NULL,
  `passenger_status` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `refund_request` tinyint(1) NOT NULL DEFAULT '0',
  `reissue_request` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `app_setting_agent_policies`
--

CREATE TABLE `app_setting_agent_policies` (
  `id` bigint UNSIGNED NOT NULL,
  `policy_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `domestic_amount` double DEFAULT NULL,
  `domestic_amount_type` tinyint DEFAULT NULL COMMENT '1=Amount | 2=Percent',
  `domestic_max_amount` double NOT NULL,
  `international_amount` double NOT NULL,
  `international_amount_type` tinyint DEFAULT NULL COMMENT '1=Amount | 2=Percent',
  `international_max_amount` double NOT NULL,
  `validation_date` date DEFAULT NULL,
  `create_by_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `app_setting_banks`
--

CREATE TABLE `app_setting_banks` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `create_by_id` bigint UNSIGNED NOT NULL,
  `update_by_id` bigint UNSIGNED NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `app_setting_bank_branches`
--

CREATE TABLE `app_setting_bank_branches` (
  `id` bigint UNSIGNED NOT NULL,
  `branch_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip_postal_code` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `bank_id` bigint UNSIGNED NOT NULL,
  `create_by_id` bigint UNSIGNED NOT NULL,
  `update_by_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `app_setting_exclude_airlines`
--

CREATE TABLE `app_setting_exclude_airlines` (
  `id` bigint UNSIGNED NOT NULL,
  `airline_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `app_setting_gds`
--

CREATE TABLE `app_setting_gds` (
  `id` bigint UNSIGNED NOT NULL,
  `gds_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cert_client_id` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cert_client_secret` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_client_id` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_client_secret` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_production` tinyint(1) NOT NULL DEFAULT '0',
  `cert_server` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_server` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `target_city_cert` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  `target_city_prod` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cert_soap_server` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prod_soap_server` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `app_setting_gds`
--

INSERT INTO `app_setting_gds` (`id`, `gds_name`, `cert_client_id`, `cert_client_secret`, `prod_client_id`, `prod_client_secret`, `is_production`, `cert_server`, `prod_server`, `target_city_cert`, `is_active`, `target_city_prod`, `cert_soap_server`, `prod_soap_server`, `created_at`, `updated_at`) VALUES
(1, 'Sabre', 'V1:517038:R5FJ:AA', 'sky1313', NULL, NULL, 0, 'https://api-crt.cert.havail.sabre.com', NULL, 'R5FJ', 0, NULL, NULL, NULL, '2023-11-19 04:45:06', '2024-02-06 09:30:59'),
(2, 'Galileo', 'Universal API/uAPI3896227374-bec1531f', 'P-i8=f3Na6', 'Universal API/uAPI1831733874-0d5a4f33', '2x_QW9f}8e', 0, 'https://apac.universal-api.pp.travelport.com/B2BGateway/connect/uAPI/AirService', 'https://apac.universal-api.travelport.com/B2BGateway/connect/uAPI/AirService', 'P7151272', 0, 'P3814427', NULL, NULL, '2023-11-24 23:27:48', '2024-01-25 03:37:49');

-- --------------------------------------------------------

--
-- Table structure for table `app_setting_soto_airlines`
--

CREATE TABLE `app_setting_soto_airlines` (
  `id` bigint UNSIGNED NOT NULL,
  `airline_code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `card_types`
--

CREATE TABLE `card_types` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phonecode` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `code`, `phonecode`, `created_at`, `updated_at`) VALUES
(1, 'Afghanistan', 'AF', '93', NULL, NULL),
(2, 'Albania', 'AL', '355', NULL, NULL),
(3, 'Algeria', 'DZ', '213', NULL, NULL),
(4, 'American Samoa', 'AS', '1684', NULL, NULL),
(5, 'Andorra', 'AD', '376', NULL, NULL),
(6, 'Angola', 'AO', '244', NULL, NULL),
(7, 'Anguilla', 'AI', '1264', NULL, NULL),
(8, 'Antarctica', 'AQ', '0', NULL, NULL),
(9, 'Antigua and Barbuda', 'AG', '1268', NULL, NULL),
(10, 'Argentina', 'AR', '54', NULL, NULL),
(11, 'Armenia', 'AM', '374', NULL, NULL),
(12, 'Aruba', 'AW', '297', NULL, NULL),
(13, 'Australia', 'AU', '61', NULL, NULL),
(14, 'Austria', 'AT', '43', NULL, NULL),
(15, 'Azerbaijan', 'AZ', '994', NULL, NULL),
(16, 'Bahamas', 'BS', '1242', NULL, NULL),
(17, 'Bahrain', 'BH', '973', NULL, NULL),
(18, 'Bangladesh', 'BD', '880', NULL, NULL),
(19, 'Barbados', 'BB', '1246', NULL, NULL),
(20, 'Belarus', 'BY', '375', NULL, NULL),
(21, 'Belgium', 'BE', '32', NULL, NULL),
(22, 'Belize', 'BZ', '501', NULL, NULL),
(23, 'Benin', 'BJ', '229', NULL, NULL),
(24, 'Bermuda', 'BM', '1441', NULL, NULL),
(25, 'Bhutan', 'BT', '975', NULL, NULL),
(26, 'Bolivia', 'BO', '591', NULL, NULL),
(27, 'Bosnia and Herzegovina', 'BA', '387', NULL, NULL),
(28, 'Botswana', 'BW', '267', NULL, NULL),
(29, 'Brazil', 'BR', '55', NULL, NULL),
(30, 'British Indian Ocean Territory', 'IO', '246', NULL, NULL),
(31, 'Brunei Darussalam', 'BN', '673', NULL, NULL),
(32, 'Bulgaria', 'BG', '359', NULL, NULL),
(33, 'Burkina Faso', 'BF', '226', NULL, NULL),
(34, 'Burundi', 'BI', '257', NULL, NULL),
(35, 'Cambodia', 'KH', '855', NULL, NULL),
(36, 'Cameroon', 'CM', '237', NULL, NULL),
(37, 'Canada', 'CA', '1', NULL, NULL),
(38, 'Cape Verde', 'CV', '238', NULL, NULL),
(39, 'Cayman Islands', 'KY', '1345', NULL, NULL),
(40, 'Central African Republic', 'CF', '236', NULL, NULL),
(41, 'Chad', 'TD', '235', NULL, NULL),
(42, 'Chile', 'CL', '56', NULL, NULL),
(43, 'China', 'CN', '86', NULL, NULL),
(44, 'Christmas Island', 'CX', '61', NULL, NULL),
(45, 'Cocos (Keeling) Islands', 'CC', '61', NULL, NULL),
(46, 'Colombia', 'CO', '57', NULL, NULL),
(47, 'Comoros', 'KM', '269', NULL, NULL),
(48, 'Congo', 'CG', '242', NULL, NULL),
(49, 'Congo, Democratic Republic of the', 'CD', '243', NULL, NULL),
(50, 'Cook Islands', 'CK', '682', NULL, NULL),
(51, 'Costa Rica', 'CR', '506', NULL, NULL),
(52, 'Cote d\'Ivoire', 'CI', '225', NULL, NULL),
(53, 'Croatia', 'HR', '385', NULL, NULL),
(54, 'Cuba', 'CU', '53', NULL, NULL),
(55, 'Cyprus', 'CY', '357', NULL, NULL),
(56, 'Czech Republic', 'CZ', '420', NULL, NULL),
(57, 'Denmark', 'DK', '45', NULL, NULL),
(58, 'Djibouti', 'DJ', '253', NULL, NULL),
(59, 'Dominica', 'DM', '1767', NULL, NULL),
(60, 'Dominican Republic', 'DO', '1809', NULL, NULL),
(61, 'Ecuador', 'EC', '593', NULL, NULL),
(62, 'Egypt', 'EG', '20', NULL, NULL),
(63, 'El Salvador', 'SV', '503', NULL, NULL),
(64, 'Equatorial Guinea', 'GQ', '240', NULL, NULL),
(65, 'Eritrea', 'ER', '291', NULL, NULL),
(66, 'Estonia', 'EE', '372', NULL, NULL),
(67, 'Eswatini', 'SZ', '268', NULL, NULL),
(68, 'Ethiopia', 'ET', '251', NULL, NULL),
(69, 'Falkland Islands (Malvinas)', 'FK', '500', NULL, NULL),
(70, 'Faroe Islands', 'FO', '298', NULL, NULL),
(71, 'Fiji', 'FJ', '679', NULL, NULL),
(72, 'Finland', 'FI', '358', NULL, NULL),
(73, 'France', 'FR', '33', NULL, NULL),
(74, 'French Guiana', 'GF', '594', NULL, NULL),
(75, 'French Polynesia', 'PF', '689', NULL, NULL),
(76, 'Gabon', 'GA', '241', NULL, NULL),
(77, 'Gambia', 'GM', '220', NULL, NULL),
(78, 'Georgia', 'GE', '995', NULL, NULL),
(79, 'Germany', 'DE', '49', NULL, NULL),
(80, 'Ghana', 'GH', '233', NULL, NULL),
(81, 'Gibraltar', 'GI', '350', NULL, NULL),
(82, 'Greece', 'GR', '30', NULL, NULL),
(83, 'Greenland', 'GL', '299', NULL, NULL),
(84, 'Grenada', 'GD', '1473', NULL, NULL),
(85, 'Guadeloupe', 'GP', '590', NULL, NULL),
(86, 'Guam', 'GU', '1671', NULL, NULL),
(87, 'Guatemala', 'GT', '502', NULL, NULL),
(88, 'Guernsey', 'GG', '44', NULL, NULL),
(89, 'Guinea', 'GN', '224', NULL, NULL),
(90, 'Guinea-Bissau', 'GW', '245', NULL, NULL),
(91, 'Guyana', 'GY', '592', NULL, NULL),
(92, 'Haiti', 'HT', '509', NULL, NULL),
(93, 'Holy See (Vatican City State)', 'VA', '39', NULL, NULL),
(94, 'Honduras', 'HN', '504', NULL, NULL),
(95, 'Hong Kong', 'HK', '852', NULL, NULL),
(96, 'Hungary', 'HU', '36', NULL, NULL),
(97, 'Iceland', 'IS', '354', NULL, NULL),
(98, 'India', 'IN', '91', NULL, NULL),
(99, 'Indonesia', 'ID', '62', NULL, NULL),
(100, 'Iran, Islamic Republic of', 'IR', '98', NULL, NULL),
(101, 'Iraq', 'IQ', '964', NULL, NULL),
(102, 'Ireland', 'IE', '353', NULL, NULL),
(103, 'Isle of Man', 'IM', '44', NULL, NULL),
(104, 'Israel', 'IL', '972', NULL, NULL),
(105, 'Italy', 'IT', '39', NULL, NULL),
(106, 'Jamaica', 'JM', '1876', NULL, NULL),
(107, 'Japan', 'JP', '81', NULL, NULL),
(108, 'Jersey', 'JE', '44', NULL, NULL),
(109, 'Jordan', 'JO', '962', NULL, NULL),
(110, 'Kazakhstan', 'KZ', '7', NULL, NULL),
(111, 'Kenya', 'KE', '254', NULL, NULL),
(112, 'Kiribati', 'KI', '686', NULL, NULL),
(113, 'Korea, Democratic People\'s Republic of', 'KP', '850', NULL, NULL),
(114, 'Korea, Republic of', 'KR', '82', NULL, NULL),
(115, 'Kuwait', 'KW', '965', NULL, NULL),
(116, 'Kyrgyzstan', 'KG', '996', NULL, NULL),
(117, 'Lao People\'s Democratic Republic', 'LA', '856', NULL, NULL),
(118, 'Latvia', 'LV', '371', NULL, NULL),
(119, 'Lebanon', 'LB', '961', NULL, NULL),
(120, 'Lesotho', 'LS', '266', NULL, NULL),
(121, 'Liberia', 'LR', '231', NULL, NULL),
(122, 'Libya', 'LY', '218', NULL, NULL),
(123, 'Liechtenstein', 'LI', '423', NULL, NULL),
(124, 'Lithuania', 'LT', '370', NULL, NULL),
(125, 'Luxembourg', 'LU', '352', NULL, NULL),
(126, 'Macao', 'MO', '853', NULL, NULL),
(127, 'Macedonia', 'MK', '389', NULL, NULL),
(128, 'Madagascar', 'MG', '261', NULL, NULL),
(129, 'Malawi', 'MW', '265', NULL, NULL),
(130, 'Malaysia', 'MY', '60', NULL, NULL),
(131, 'Maldives', 'MV', '960', NULL, NULL),
(132, 'Mali', 'ML', '223', NULL, NULL),
(133, 'Malta', 'MT', '356', NULL, NULL),
(134, 'Marshall Islands', 'MH', '692', NULL, NULL),
(135, 'Martinique', 'MQ', '596', NULL, NULL),
(136, 'Mauritania', 'MR', '222', NULL, NULL),
(137, 'Mauritius', 'MU', '230', NULL, NULL),
(138, 'Mayotte', 'YT', '269', NULL, NULL),
(139, 'Mexico', 'MX', '52', NULL, NULL),
(140, 'Micronesia', 'FM', '691', NULL, NULL),
(141, 'Moldova, Republic of', 'MD', '373', NULL, NULL),
(142, 'Monaco', 'MC', '377', NULL, NULL),
(143, 'Mongolia', 'MN', '976', NULL, NULL),
(144, 'Montenegro', 'ME', '382', NULL, NULL),
(145, 'Montserrat', 'MS', '1664', NULL, NULL),
(146, 'Morocco', 'MA', '212', NULL, NULL),
(147, 'Mozambique', 'MZ', '258', NULL, NULL),
(148, 'Myanmar', 'MM', '95', NULL, NULL),
(149, 'Namibia', 'NA', '264', NULL, NULL),
(150, 'Nauru', 'NR', '674', NULL, NULL),
(151, 'Nepal', 'NP', '977', NULL, NULL),
(152, 'Netherlands', 'NL', '31', NULL, NULL),
(153, 'New Caledonia', 'NC', '687', NULL, NULL),
(154, 'New Zealand', 'NZ', '64', NULL, NULL),
(155, 'Nicaragua', 'NI', '505', NULL, NULL),
(156, 'Niger', 'NE', '227', NULL, NULL),
(157, 'Nigeria', 'NG', '234', NULL, NULL),
(158, 'Niue', 'NU', '683', NULL, NULL),
(159, 'Norfolk Island', 'NF', '672', NULL, NULL),
(160, 'Northern Mariana Islands', 'MP', '1670', NULL, NULL),
(161, 'Norway', 'NO', '47', NULL, NULL),
(162, 'Oman', 'OM', '968', NULL, NULL),
(163, 'Pakistan', 'PK', '92', NULL, NULL),
(164, 'Palau', 'PW', '680', NULL, NULL),
(165, 'Palestine, State of', 'PS', '970', NULL, NULL),
(166, 'Panama', 'PA', '507', NULL, NULL),
(167, 'Papua New Guinea', 'PG', '675', NULL, NULL),
(168, 'Paraguay', 'PY', '595', NULL, NULL),
(169, 'Peru', 'PE', '51', NULL, NULL),
(170, 'Philippines', 'PH', '63', NULL, NULL),
(171, 'Pitcairn', 'PN', '0', NULL, NULL),
(172, 'Poland', 'PL', '48', NULL, NULL),
(173, 'Portugal', 'PT', '351', NULL, NULL),
(174, 'Puerto Rico', 'PR', '1787', NULL, NULL),
(175, 'Qatar', 'QA', '974', NULL, NULL),
(176, 'Réunion', 'RE', '262', NULL, NULL),
(177, 'Romania', 'RO', '40', NULL, NULL),
(178, 'Russian Federation', 'RU', '7', NULL, NULL),
(179, 'Rwanda', 'RW', '250', NULL, NULL),
(180, 'Saint Barthélemy', 'BL', '590', NULL, NULL),
(181, 'Saint Helena, Ascension and Tristan da Cunha', 'SH', '290', NULL, NULL),
(182, 'Saint Kitts and Nevis', 'KN', '1869', NULL, NULL),
(183, 'Saint Lucia', 'LC', '1758', NULL, NULL),
(184, 'Spain', 'ES', '34', NULL, NULL),
(185, 'Sri Lanka', 'LK', '94', NULL, NULL),
(186, 'Sudan', 'SD', '249', NULL, NULL),
(187, 'Suriname', 'SR', '597', NULL, NULL),
(188, 'Svalbard and Jan Mayen', 'SJ', '47', NULL, NULL),
(189, 'Swaziland', 'SZ', '268', NULL, NULL),
(190, 'Sweden', 'SE', '46', NULL, NULL),
(191, 'Switzerland', 'CH', '41', NULL, NULL),
(192, 'Syrian Arab Republic', 'SY', '963', NULL, NULL),
(193, 'Taiwan', 'TW', '886', NULL, NULL),
(194, 'Tajikistan', 'TJ', '992', NULL, NULL),
(195, 'Tanzania, United Republic of', 'TZ', '255', NULL, NULL),
(196, 'Thailand', 'TH', '66', NULL, NULL),
(197, 'Timor-Leste', 'TL', '670', NULL, NULL),
(198, 'Togo', 'TG', '228', NULL, NULL),
(199, 'Tokelau', 'TK', '690', NULL, NULL),
(200, 'Tonga', 'TO', '676', NULL, NULL),
(201, 'Trinidad and Tobago', 'TT', '1868', NULL, NULL),
(202, 'Tunisia', 'TN', '216', NULL, NULL),
(203, 'Turkey', 'TR', '90', NULL, NULL),
(204, 'Turkmenistan', 'TM', '7370', NULL, NULL),
(205, 'Turks and Caicos Islands', 'TC', '1649', NULL, NULL),
(206, 'Tuvalu', 'TV', '688', NULL, NULL),
(207, 'Uganda', 'UG', '256', NULL, NULL),
(208, 'Ukraine', 'UA', '380', NULL, NULL),
(209, 'United Arab Emirates', 'AE', '971', NULL, NULL),
(210, 'United Kingdom', 'GB', '44', NULL, NULL),
(211, 'United States', 'US', '1', NULL, NULL),
(212, 'United States Minor Outlying Islands', 'UM', '1', NULL, NULL),
(213, 'Uruguay', 'UY', '598', NULL, NULL),
(214, 'Uzbekistan', 'UZ', '998', NULL, NULL),
(215, 'Vanuatu', 'VU', '678', NULL, NULL),
(216, 'Venezuela, Bolivarian Republic of', 'VE', '58', NULL, NULL),
(217, 'Viet Nam', 'VN', '84', NULL, NULL),
(218, 'Virgin Islands, British', 'VG', '1284', NULL, NULL),
(219, 'Virgin Islands, U.S.', 'VI', '1340', NULL, NULL),
(220, 'Wallis and Futuna', 'WF', '681', NULL, NULL),
(221, 'Western Sahara', 'EH', '212', NULL, NULL),
(222, 'Yemen', 'YE', '967', NULL, NULL),
(223, 'Zambia', 'ZM', '260', NULL, NULL),
(224, 'Zimbabwe', 'ZW', '263', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `default_payment_setups`
--

CREATE TABLE `default_payment_setups` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doc_types`
--

CREATE TABLE `doc_types` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gds_baggage_informations`
--

CREATE TABLE `gds_baggage_informations` (
  `id` bigint UNSIGNED NOT NULL,
  `cabin_max_pcs` int DEFAULT NULL,
  `cabin_size_inch` int DEFAULT NULL,
  `cabin_size_centi` int DEFAULT NULL,
  `cabin_weight_pounds` int DEFAULT NULL,
  `cabin_weight_kg` int DEFAULT NULL,
  `checked_weight_kg` int DEFAULT NULL,
  `checked_bag_pcs` int DEFAULT NULL,
  `pnr_no_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gds_flights`
--

CREATE TABLE `gds_flights` (
  `id` bigint UNSIGNED NOT NULL,
  `airline_code` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `flight_number` int NOT NULL,
  `from_airport` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `to_airport` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `departure_date` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `departure_time` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `arrival_date` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `arrival_time` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cabin_class` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `aircraft_type_name` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `booking_class` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `meals` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `duration_minutes` int NOT NULL,
  `distance_miles` int NOT NULL,
  `pnr_no_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gds_leg_descriptions`
--

CREATE TABLE `gds_leg_descriptions` (
  `id` bigint UNSIGNED NOT NULL,
  `first_airport` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_airport` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `departure_date` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `departure_time` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `number_of_flights` int NOT NULL,
  `pnr_no_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gds_pnr`
--

CREATE TABLE `gds_pnr` (
  `id` bigint UNSIGNED NOT NULL,
  `fabricated_pnr` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `airline_pnr` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gds_pnr` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_cancel` tinyint(1) NOT NULL DEFAULT '0',
  `is_ticketed` tinyint(1) NOT NULL DEFAULT '0',
  `is_production` tinyint(1) NOT NULL DEFAULT '0',
  `journey_start_date` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `journey_end_date` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_passengers` int NOT NULL,
  `total_amount` double NOT NULL,
  `base_fare` double NOT NULL,
  `tax_fare` double NOT NULL,
  `admin_charge` double NOT NULL,
  `vat_amount` double NOT NULL,
  `commission_amount` double NOT NULL,
  `currency` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_original` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_fabricated` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_company_id` bigint UNSIGNED DEFAULT NULL,
  `created_user_id` bigint UNSIGNED NOT NULL,
  `is_dump` tinyint(1) NOT NULL DEFAULT '0',
  `is_ticket_cancel` tinyint(1) NOT NULL DEFAULT '0',
  `is_ticket_refund` tinyint(1) NOT NULL DEFAULT '0',
  `updated_user_id` bigint UNSIGNED DEFAULT NULL,
  `is_cancel_req` tinyint(1) NOT NULL DEFAULT '0',
  `gds` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider_pnr` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `holder_last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `supplier_pnr` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_soto_ticket` tinyint(1) NOT NULL DEFAULT '0',
  `is_domestic` tinyint(1) NOT NULL DEFAULT '0',
  `status` smallint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gds_travelers`
--

CREATE TABLE `gds_travelers` (
  `id` bigint UNSIGNED NOT NULL,
  `given_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `passenger_type` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `passenger_email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthdate` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `doc_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `doc_number` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pnr_no_id` bigint UNSIGNED NOT NULL,
  `name_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_cancel` tinyint(1) NOT NULL DEFAULT '0',
  `passenger_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ssr_name_number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` bigint UNSIGNED NOT NULL,
  `lang_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '0=Inactive , 1=Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `lang_name`, `title`, `slug`, `status`) VALUES
(1, 'English', 'en', 'en', 1),
(2, 'Bangla', 'bn', 'bn', 1);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_03_01_042503_create_cache_table', 1),
(2, '2014_10_12_000000_create_users_table', 1),
(3, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2014_10_12_200000_add_two_factor_columns_to_users_table', 1),
(5, '2019_08_19_000000_create_failed_jobs_table', 1),
(6, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(7, '2021_12_25_124522_create_settings_table', 1),
(8, '2022_05_25_072926_create_languages_table', 1),
(9, '2023_02_09_051208_create_permission_tables', 1),
(10, '2023_02_12_070616_create_sessions_table', 1),
(11, '2023_02_28_082321_add_group_column_in_permissions_table', 1),
(12, '2023_06_15_113639_add_agent_categories_table', 1),
(13, '2023_06_15_113816_add_table_agent_sub_categories', 1),
(14, '2023_06_15_114230_create_agent_table', 1),
(15, '2023_06_15_120341_create_doc_types_table', 1),
(16, '2023_06_15_120631_create_agent_details_table', 1),
(17, '2023_06_15_120836_create_agent_pay_accounts_table', 1),
(18, '2023_06_15_120948_create_agent_reviews_table', 1),
(19, '2023_06_15_121042_create_agent_withdraw_requests_table', 1),
(20, '2023_06_19_094850_create_countries_table', 1),
(21, '2023_06_19_121706_create_payment_methods_table', 1),
(22, '2023_06_19_122006_create_card_types_table', 1),
(23, '2023_07_06_064719_create_agent_payment_setups_table', 1),
(24, '2023_07_08_085721_create_default_payment_setups_table', 1),
(25, '2023_07_11_054347_create_notifications_table', 1),
(26, '2023_08_01_093719_create_predefined_answers_table', 1),
(27, '2023_11_12_110356_create_transaction_table', 1),
(28, '2023_11_12_112008_create_transaction_wallets_table', 1),
(29, '2023_11_13_094659_create_appsetting_gds_table', 1),
(30, '2023_11_13_103907_create_appsetting_exclude_airline_table', 1),
(31, '2023_11_14_033315_create_appsetting_soto_airline_table', 1),
(32, '2023_11_14_061554_add_agent_id_to_users_table', 1),
(33, '2023_11_14_100226_create_app_setting_banks_table', 1),
(34, '2023_11_14_120342_create_app_setting_bank_branches_table', 1),
(35, '2023_11_15_064649_create_app_setting_policies_table', 1),
(36, '2023_11_16_075506_create_search_pads_table', 1),
(37, '2023_12_03_093707_create_gds_pnr_table', 2),
(38, '2023_12_03_095334_create_gds_leg_description_table', 2),
(39, '2023_12_03_095645_create_gds_travelers_table', 2),
(40, '2023_12_03_100129_create_gds_flights_table', 2),
(41, '2023_12_03_100743_create_gds_baggage_information_table', 2),
(48, '2024_01_17_124517_create_air_tickets_table', 3),
(49, '2024_01_17_124536_create_air_ticket_details_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(2, 'App\\Models\\User', 1),
(3, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 3),
(4, 'App\\Models\\User', 4),
(4, 'App\\Models\\User', 5);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('admin@gmail.com', '$2y$10$hLtZ3mmIn3pI7lkUEwdf3eaVW3qcU/QqLhVnqvw80iXfvjOjPqDYy', '2024-02-08 06:12:06');

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'General',
  `guard_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `group`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'user_management', 'User', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(2, 'role_management', 'User', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(3, 'permission_management', 'User', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(4, 'overall_count_report', 'Dashboard', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(5, 'setting_management', 'Setting', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(6, 'mail_setting_management', 'Setting', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(7, 'recaptcha_setting_management', 'Setting', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(8, 'module_setting_management', 'Setting', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(9, 'env_setting_management', 'Setting', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(10, 'language_setting_management', 'Setting', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(11, 'backup_management', 'Backup', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(12, 'agent_management', 'Agent', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(13, 'add_agent', 'Agent', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(14, 'edit_agent', 'Agent', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(15, 'add_user', 'Agent', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(16, 'edit_user', 'Agent', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(17, 'active_agent', 'Agent', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(18, 'pending_agent', 'Agent', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(19, 'withdraw_request', 'Agent', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(20, 'transaction_management', 'Agent', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(21, 'payment_method', 'Agent', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(22, 'view_search', 'SearchPad', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(23, 'pnr_management', 'PNR', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(24, 'view_pnr', 'PNR', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(25, 'cancel_pnr', 'PNR', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(26, 'issue_ticket', 'PNR', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(27, 'view_ticket', 'PNR', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(28, 'new_deposit', 'Transaction', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(29, 'send_money', 'Transaction', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(30, 'pending_transactions', 'Transaction', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(31, 'bank_statements', 'Transaction', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(32, 'view_reports', 'Reports', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(33, 'make_booking', 'PNR', 'web', '2024-02-01 08:09:28', '2024-02-01 08:09:28'),
(34, 'cancel_ticket', 'Ticket', 'web', '2024-02-01 08:11:23', '2024-02-01 08:11:23'),
(35, 'share_ticket', 'Ticket', 'web', '2024-02-04 08:42:25', '2024-02-04 08:42:25'),
(36, 'share_pnr', 'PNR', 'web', '2024-02-04 08:44:21', '2024-02-04 08:44:21');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `predefined_answers`
--

CREATE TABLE `predefined_answers` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(2, 'Administrator', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(3, 'User', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25'),
(4, 'Agent', 'web', '2024-01-22 23:51:25', '2024-01-22 23:51:25');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 2),
(18, 2),
(19, 2),
(20, 2),
(21, 2),
(22, 2),
(23, 2),
(24, 2),
(25, 2),
(26, 2),
(27, 2),
(28, 2),
(29, 2),
(30, 2),
(31, 2),
(32, 2),
(33, 2),
(34, 2),
(35, 2),
(36, 2),
(22, 3),
(15, 4),
(16, 4),
(22, 4);

-- --------------------------------------------------------

--
-- Table structure for table `search_pads`
--

CREATE TABLE `search_pads` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint UNSIGNED NOT NULL,
  `group` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `type` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` json DEFAULT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `order` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `group`, `key`, `display_name`, `value`, `type`, `details`, `note`, `order`, `created_at`, `updated_at`) VALUES
(1, 'Site', 'site.name', 'Name', 'Subha', 'text', NULL, NULL, 1, '2023-03-21 06:00:12', '2024-02-05 12:43:20'),
(3, 'Site', 'site.url', 'Site Url', 'http://24.199.122.48/trip_laravel', 'text', NULL, NULL, 3, '2023-03-21 06:00:12', '2024-02-06 09:00:32'),
(6, 'Site', 'site.favicon', 'Favicon', 'setting/UriL61a5yauzKiTpokyShjNaSCnaVay7IZsoNbxK.png', 'image', NULL, 'Default image size 68x68', 8, '2023-03-21 06:00:12', '2024-02-04 06:48:23'),
(20, 'Site', 'site.search_bg', 'Search Background', 'setting/njcatdZcGm5ijgQffxeZB4l0tRFskXqV92N6Mne0.jpg', 'image', '[]', NULL, 10, '2024-02-05 09:57:31', '2024-02-05 09:57:44'),
(21, 'Site', 'site.login_img', 'Login Page Image', 'setting/bm5yrEts01CPPcu6H52f8Nng1pYQvPD55Rhko8gf.png', 'image', '[]', NULL, 11, '2024-02-06 11:50:07', '2024-02-06 11:53:39'),
(22, 'Site', 'site.inv_logo', 'Invoice Logo', 'setting/liJgzOEkXwILdeKyD7s15VT343oNaxByBw8wts7f.png', 'image', '[]', NULL, 12, '2024-02-06 11:50:39', '2024-02-06 11:53:39'),
(23, 'Site', 'site.login_logo', 'Login Page Logo', 'setting/KShP3kVyufkFKMxohweL2uentNDHmW0DNK3eRqjp.png', 'image', '[]', NULL, 13, '2024-02-06 11:50:58', '2024-02-06 11:53:39'),
(24, 'Site', 'site.admin_logo', 'Admin Page Logo', 'setting/ZTU2vRSXJBu6xo4tLIMDBbzRZoncMdaF0f3B8P2y.png', 'image', '[]', NULL, 14, '2024-02-06 11:51:18', '2024-02-06 11:53:39');

-- --------------------------------------------------------

--
-- Table structure for table `transaction_transactions`
--

CREATE TABLE `transaction_transactions` (
  `id` bigint UNSIGNED NOT NULL,
  `amount` double NOT NULL,
  `reference_no` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_method` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_date` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_verify` tinyint(1) NOT NULL DEFAULT '0',
  `payment_doc` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paid_by_id` int DEFAULT NULL,
  `received_bank_id` bigint DEFAULT NULL,
  `payment_methods_id` bigint DEFAULT NULL,
  `verified_by_id` bigint DEFAULT NULL,
  `is_cancel` tinyint(1) NOT NULL DEFAULT '0',
  `depositor_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_wallets`
--

CREATE TABLE `transaction_wallets` (
  `id` bigint UNSIGNED NOT NULL,
  `currency` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `credit_amount` double NOT NULL,
  `debit_amount` double NOT NULL,
  `current_balance` double NOT NULL,
  `transaction_date` timestamp NOT NULL,
  `updated_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `changes_for_id` int DEFAULT NULL,
  `remarks` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `gender` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Male,Female,Others',
  `age` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pending' COMMENT 'Pending, Active, Suspended',
  `profile_photo_path` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `agent_id` bigint UNSIGNED DEFAULT NULL,
  `user_type` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agents`
--
ALTER TABLE `agents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agent_categories`
--
ALTER TABLE `agent_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agent_details`
--
ALTER TABLE `agent_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agent_payment_setups`
--
ALTER TABLE `agent_payment_setups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agent_pay_accounts`
--
ALTER TABLE `agent_pay_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agent_reviews`
--
ALTER TABLE `agent_reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agent_sub_categories`
--
ALTER TABLE `agent_sub_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agent_withdraw_requests`
--
ALTER TABLE `agent_withdraw_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `air_tickets`
--
ALTER TABLE `air_tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `air_ticket_details`
--
ALTER TABLE `air_ticket_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_setting_agent_policies`
--
ALTER TABLE `app_setting_agent_policies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `app_setting_agent_policies_create_by_id_foreign` (`create_by_id`);

--
-- Indexes for table `app_setting_banks`
--
ALTER TABLE `app_setting_banks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `app_setting_banks_create_by_id_foreign` (`create_by_id`),
  ADD KEY `app_setting_banks_update_by_id_foreign` (`update_by_id`);

--
-- Indexes for table `app_setting_bank_branches`
--
ALTER TABLE `app_setting_bank_branches`
  ADD PRIMARY KEY (`id`),
  ADD KEY `app_setting_bank_branches_bank_id_foreign` (`bank_id`),
  ADD KEY `app_setting_bank_branches_create_by_id_foreign` (`create_by_id`),
  ADD KEY `app_setting_bank_branches_update_by_id_foreign` (`update_by_id`);

--
-- Indexes for table `app_setting_exclude_airlines`
--
ALTER TABLE `app_setting_exclude_airlines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_setting_gds`
--
ALTER TABLE `app_setting_gds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `app_setting_soto_airlines`
--
ALTER TABLE `app_setting_soto_airlines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `card_types`
--
ALTER TABLE `card_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `default_payment_setups`
--
ALTER TABLE `default_payment_setups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doc_types`
--
ALTER TABLE `doc_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `gds_baggage_informations`
--
ALTER TABLE `gds_baggage_informations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gds_baggage_informations_pnr_no_id_foreign` (`pnr_no_id`);

--
-- Indexes for table `gds_flights`
--
ALTER TABLE `gds_flights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gds_flights_pnr_no_id_foreign` (`pnr_no_id`);

--
-- Indexes for table `gds_leg_descriptions`
--
ALTER TABLE `gds_leg_descriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gds_leg_descriptions_pnr_no_id_foreign` (`pnr_no_id`);

--
-- Indexes for table `gds_pnr`
--
ALTER TABLE `gds_pnr`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gds_travelers`
--
ALTER TABLE `gds_travelers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gds_travelers_pnr_no_id_foreign` (`pnr_no_id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `languages_lang_name_unique` (`lang_name`),
  ADD UNIQUE KEY `languages_title_unique` (`title`),
  ADD UNIQUE KEY `languages_slug_unique` (`slug`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `predefined_answers`
--
ALTER TABLE `predefined_answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `search_pads`
--
ALTER TABLE `search_pads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indexes for table `transaction_transactions`
--
ALTER TABLE `transaction_transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction_wallets`
--
ALTER TABLE `transaction_wallets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agents`
--
ALTER TABLE `agents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agent_categories`
--
ALTER TABLE `agent_categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agent_details`
--
ALTER TABLE `agent_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agent_payment_setups`
--
ALTER TABLE `agent_payment_setups`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agent_pay_accounts`
--
ALTER TABLE `agent_pay_accounts`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agent_reviews`
--
ALTER TABLE `agent_reviews`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agent_sub_categories`
--
ALTER TABLE `agent_sub_categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `agent_withdraw_requests`
--
ALTER TABLE `agent_withdraw_requests`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `air_tickets`
--
ALTER TABLE `air_tickets`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `air_ticket_details`
--
ALTER TABLE `air_ticket_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `app_setting_agent_policies`
--
ALTER TABLE `app_setting_agent_policies`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `app_setting_banks`
--
ALTER TABLE `app_setting_banks`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `app_setting_bank_branches`
--
ALTER TABLE `app_setting_bank_branches`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `app_setting_exclude_airlines`
--
ALTER TABLE `app_setting_exclude_airlines`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `app_setting_gds`
--
ALTER TABLE `app_setting_gds`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `app_setting_soto_airlines`
--
ALTER TABLE `app_setting_soto_airlines`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `card_types`
--
ALTER TABLE `card_types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=225;

--
-- AUTO_INCREMENT for table `default_payment_setups`
--
ALTER TABLE `default_payment_setups`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doc_types`
--
ALTER TABLE `doc_types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gds_baggage_informations`
--
ALTER TABLE `gds_baggage_informations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gds_flights`
--
ALTER TABLE `gds_flights`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gds_leg_descriptions`
--
ALTER TABLE `gds_leg_descriptions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gds_pnr`
--
ALTER TABLE `gds_pnr`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gds_travelers`
--
ALTER TABLE `gds_travelers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `predefined_answers`
--
ALTER TABLE `predefined_answers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `search_pads`
--
ALTER TABLE `search_pads`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `transaction_transactions`
--
ALTER TABLE `transaction_transactions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction_wallets`
--
ALTER TABLE `transaction_wallets`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `app_setting_agent_policies`
--
ALTER TABLE `app_setting_agent_policies`
  ADD CONSTRAINT `app_setting_agent_policies_create_by_id_foreign` FOREIGN KEY (`create_by_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `app_setting_banks`
--
ALTER TABLE `app_setting_banks`
  ADD CONSTRAINT `app_setting_banks_create_by_id_foreign` FOREIGN KEY (`create_by_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `app_setting_banks_update_by_id_foreign` FOREIGN KEY (`update_by_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `app_setting_bank_branches`
--
ALTER TABLE `app_setting_bank_branches`
  ADD CONSTRAINT `app_setting_bank_branches_bank_id_foreign` FOREIGN KEY (`bank_id`) REFERENCES `app_setting_banks` (`id`),
  ADD CONSTRAINT `app_setting_bank_branches_create_by_id_foreign` FOREIGN KEY (`create_by_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `app_setting_bank_branches_update_by_id_foreign` FOREIGN KEY (`update_by_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `gds_baggage_informations`
--
ALTER TABLE `gds_baggage_informations`
  ADD CONSTRAINT `gds_baggage_informations_pnr_no_id_foreign` FOREIGN KEY (`pnr_no_id`) REFERENCES `gds_pnr` (`id`);

--
-- Constraints for table `gds_flights`
--
ALTER TABLE `gds_flights`
  ADD CONSTRAINT `gds_flights_pnr_no_id_foreign` FOREIGN KEY (`pnr_no_id`) REFERENCES `gds_pnr` (`id`);

--
-- Constraints for table `gds_leg_descriptions`
--
ALTER TABLE `gds_leg_descriptions`
  ADD CONSTRAINT `gds_leg_descriptions_pnr_no_id_foreign` FOREIGN KEY (`pnr_no_id`) REFERENCES `gds_pnr` (`id`);

--
-- Constraints for table `gds_travelers`
--
ALTER TABLE `gds_travelers`
  ADD CONSTRAINT `gds_travelers_pnr_no_id_foreign` FOREIGN KEY (`pnr_no_id`) REFERENCES `gds_pnr` (`id`);

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
