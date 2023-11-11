export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export const checkCancelableOrderStatus = (status) => {
    if (status === 'Chờ Lấy Hàng' || status === 'Chờ Xác Nhận') {
        return true;
    } else {
        return false;
    }
}

export const convertMongoDBDate = (date) => {
    const day = date?.substr(8, 2);
    const month = date?.substr(5, 2);
    const year = date?.substr(0, 4);
    return day + '-' + month + '-' + year;
}