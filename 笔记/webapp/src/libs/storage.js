// 插入项
export const setItem = (name, value) => {
    localStorage.setItem(name, value);
}

// 获取项
export const getItem = (name) => {
    return localStorage.getItem(name);
}

// 删除项
export const removeItem = (name) => {
    localStorage.removeItem(name);
}

// 插入项，对象
export const setItemObj = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
}

// 获取项，对象
export const getItemObj = (name) => {
    return JSON.parse(localStorage.getItem(name));
}
