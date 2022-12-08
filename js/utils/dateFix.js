function formatDate(input) {
  return new Date(input).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}

export { formatDate };
