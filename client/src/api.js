import axios from 'axios';

const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
    withCredentials: true
});

const errHandler = err => {
    console.error(err);
    throw err;
};

export default {
    service: service,

    getProducts() {
        return service
            .get('/products')
            .then(res => res.data)
            .catch(errHandler);
    },
    getProduct(id) {
        return service
            .get(`/products/${id}`)
            .then(res => res.data)
            .catch(errHandler);
    },
    postProducts(data) {
        return service
            .post('/products', data)
            .then(res => res.data)
            .catch(errHandler);
    },

    getUserProfile() {
        return service
            .get('/user-profile')
            .then(res => res.data)
            .catch(errHandler);
    },

    getProductsOfUser(id) {
        return service
            .get(`/user/${id}`)
            .then(res => res.data)
            .catch(errHandler);
    },

    signup(userInfo) {
        return service
            .post('/signup', userInfo)
            .then(res => res.data)
            .catch(errHandler);
    },

    login(username, password) {
        return service
            .post('/login', {
                username,
                password
            })
            .then(res => {
                localStorage.setItem('user', JSON.stringify(res.data));
                return res.data;
            })
            .catch(errHandler);
    },

    logout() {
        localStorage.removeItem('user');
        return service.get('/logout');
    },

    // getCurrentUser() {
    //     const userData = localStorage.getItem('user');
    //     if (!userData) return false;
    //     const user = JSON.parse(userData);
    //     if (user.token) {
    //         axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
    //         return user;
    //     }
    //     return false;
    // },

    getCurrentUser() {
        return service
            .get('/user')
            .then(res => res.data)
            .catch(errHandler);
    },

    isLoggedIn() {
        return localStorage.getItem('user') != null;
    },

    addPicture(file) {
        const formData = new FormData();
        formData.append('picture', file);
        return service
            .post('/products/add-new-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data)
            .catch(errHandler);
    },
    updateUserInformation(data) {
        let formData = new FormData();
        console.log('DATA', data);
        formData.append('picture', data.file);
        formData.append('firstname', data.firstname);
        formData.append('surname', data.surname);
        formData.append('email', data.email);
        formData.append('street', data.street);
        formData.append('number', data.number);
        formData.append('postalcode', data.postalcode);
        formData.append('city', data.city);
        formData.append('district', data.district);
        return service
            .patch('/user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data)
            .catch(errHandler);
    },
    updateProductInformation(data) {
        let formData = new FormData();
        formData.append('picture', data.file);
        formData.append('name', data.name);
        formData.append('subtitle', data.subtitle);
        formData.append('description', data.description);
        formData.append('_owner', data._owner);
        return service
            .patch('/product/:id', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => res.data)
            .catch(errHandler);
    }
};
