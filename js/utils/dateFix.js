function formatDate(input) {
    return new Date(input).toLocaleDateString('en-us', {
        month: 'long',
        day: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
}

export { formatDate };
