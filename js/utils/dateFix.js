// function formatDate(input) {
//   return new Date(input).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//   });
// }

function formatDate(input) {
  return new Date(input).toISOString({
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export { formatDate };
