// Hàm chuyển đổi ngày thành định dạng "thời gian đã đăng"
function timeAgo(date) {
    const rtf = new Intl.RelativeTimeFormat('vi', { numeric: 'auto' });
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            return rtf.format(-count, interval.label);
        }
    }

    return 'Vừa xong';
}
export default timeAgo
