-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2021 at 11:05 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `libdut`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `genre` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `publisher` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `edition` int(11) NOT NULL,
  `isbn` bigint(13) NOT NULL,
  `pages` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `date_issued` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `user_id`, `image`, `genre`, `title`, `author`, `publisher`, `edition`, `isbn`, `pages`, `description`, `date_issued`) VALUES
(12, 7, 'L0JIw9BwPgmk.jpg', 'Sách Đại cương', 'Bài tập Toán Cao Cấp', 'Nguyễn Đình Trí', 'Giáo Dục', 1, 1112223334445, 560, 'Đây là giáo trình bài tập Toán cao cấp dành cho sinh viên trường Kỹ thuật.\r\nMục lục\r\n1. Tập hợp. Ánh xạ\r\n2. Một số cấu trúc đại số. Số phức\r\n3. Ma trận. Định thức. Hệ phương trình tuyến tính\r\n4. Không gian vecto\r\n5. Ánh xạ tuyến tính\r\n6. Dạng toàn phương.', '2021-08-08 16:21:34'),
(13, 21, '2017-03-22-02-40-03_2017-03-10-04-54-30_image001.jpg', 'Sách Đại cương', 'Giáo trình Giải tích', 'Tạ Văn Đình', 'Đại học Quốc gia HCM', 2, 1234567891234, 600, '1. Tập hợp. Ánh xạ\r\n2. Một số cấu trúc đại số. Số phức\r\n3. Ma trận. Định thức. Hệ phương trình tuyến tính\r\n4. Không gian vecto\r\n5. Ánh xạ tuyến tính\r\n6. Dạng toàn phương. Không gian Euclid', '2021-08-14 02:50:42'),
(15, NULL, 'b4__78206_image2_800_big.jpg', 'Sách / Giáo trình Chuyên ngành', 'Vật lý đại cương', 'Lương Duyên Bình', 'Giáo Dục', 1, 1111111111110, 268, ' Nắm vững các khái niệm, định luật, nguyên lý cơ bản của Vật lý.\r\n\r\n- Vận dụng tốt các kiến thức đó để hiểu được bản chất của các hiện tượng Vật lý xảy ra trong tự nhiên và kỹ thuật.\r\n- Giải quyết được các bài toán định tính và định lượng.\r\n- Rèn luyện kỹ', NULL),
(16, 21, 'default.png', 'Báo cáo Khoa học Công Nghệ', 'NCKH đề tài Quan trắc khí tượng', 'Vũ Đình Diệm', 'Khác ...', 0, 2222222222222, 0, '', '2021-08-14 02:08:47'),
(18, NULL, '22566.jpg', 'Sách / Giáo trình Chuyên ngành', 'Kỹ thuật nhiệt', 'Bùi Hải - Trần Thế Sơn', 'Khoa học & Kỹ thuật', 0, 9093466437786, 0, 'Kỹ thuật nhiệt là môn khoa học nghiên cứu những quy luật biến đổi năng lượng (chủ yếu là quy luật biến đổi giữa nhiệt năng và cơ năng) và quy luật truyền nhiệt năng trong các vật nói chung hoặc trong các thiết bị nhiệt nói riêng.', NULL),
(19, NULL, 'k.jpg', 'Sách / Giáo trình Chuyên ngành', '000000000', '0000000000', 'Đại học Quốc gia HCM', 0, 1111111111111, 0, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `books_request`
--

CREATE TABLE `books_request` (
  `request_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `publisher` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `edition` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `books_request`
--

INSERT INTO `books_request` (`request_id`, `user_id`, `image`, `title`, `author`, `publisher`, `edition`, `date`) VALUES
(4, 10, 'unnamed.jpg', 'Lập trình Java căn bản', 'Phạm Văn Trung', 'Giáo dục', 0, '2021-08-14 02:25:37');

-- --------------------------------------------------------

--
-- Table structure for table `issue_date`
--

CREATE TABLE `issue_date` (
  `issue_id` int(10) NOT NULL,
  `book_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `issue_date`
--

INSERT INTO `issue_date` (`issue_id`, `book_id`, `user_id`, `date`) VALUES
(17, 12, 7, '2021-08-08 16:21:34'),
(18, 15, 21, '2021-08-14 02:03:33'),
(19, 16, 21, '2021-08-14 02:08:47'),
(20, 13, 21, '2021-08-14 02:50:42');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `code` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `class` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `faculty` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `is_admin`, `code`, `name`, `email`, `password`, `class`, `faculty`) VALUES
(1, 1, 12345678, 'Nguyễn Thị A', 'ad1@gmail.com', '112233', '', ''),
(2, 1, 112233909, 'Lê Thị B', 'ad2@gmail.com', '909090', '', ''),
(7, 0, 122170072, 'Trương Thị Mai Huệ', '122170072@sv.dut.edu.vn', '123123', '17PFIEV2', 'Cơ khí'),
(10, 0, 122170054, 'Nguyễn Văn Anh Quân', 'nvaquan@gmail.com', '123456', '17PFIEV2', 'Khoa học Công nghệ tiên tiến'),
(21, 0, 15050034, 'hang', 'truongt.maihue@gmail.com', '123456', '15H2', 'Hóa'),
(25, 0, 20071256, 'Dương Minh Hoàng', '20071256@sv.dut.edu.vn', '909090', '20T3', 'Công nghệ Thông tin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`book_id`),
  ADD UNIQUE KEY `isbn` (`isbn`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `books_request`
--
ALTER TABLE `books_request`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `issue_date`
--
ALTER TABLE `issue_date`
  ADD PRIMARY KEY (`issue_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `books_request`
--
ALTER TABLE `books_request`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `issue_date`
--
ALTER TABLE `issue_date`
  MODIFY `issue_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `books_request`
--
ALTER TABLE `books_request`
  ADD CONSTRAINT `books_request_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `issue_date`
--
ALTER TABLE `issue_date`
  ADD CONSTRAINT `issue_date_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `issue_date_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
