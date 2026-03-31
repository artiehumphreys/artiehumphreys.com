#include <atomic>
#include <cstddef>
#include <cstring>

std::atomic_size_t writeIdx_{}, readIdx_{};
T *buff_;
std::size_t capacity_; // power of two capacity
std::size_t mask = capacity_ - 1;

bool push(const T &val) noexcept {
  std::size_t writeIdx = writeIdx_.load(std::memory_order_seq_cst);
  std::size_t readIdx = readIdx_.load(std::memory_order_seq_cst);
  if (writeIdx - readIdx == capacity_) {
    return false;
  }
  std::memcpy(&buff_[writeIdx & mask], &val, sizeof(T));
  writeIdx_.store(writeIdx + 1, std::memory_order_seq_cst);
  return true;
}

bool pop() noexcept {
  std::size_t readIdx = readIdx_.load(std::memory_order_seq_cst);
  std::size_t writeIdx = writeIdx_.load(std::memory_order_seq_cst);
  if (readIdx == writeIdx) {
    return false;
  }
  // destruct object if necessary
  readIdx_.store(readIdx + 1, std::memory_order_seq_cst);
  return true;
}
