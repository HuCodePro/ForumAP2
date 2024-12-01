import { apiLogin } from '../api/user.js';
async function login(email, password) {
 try {
 const token = await apiLogin(email, password);
 sessionStorage.setItem('token', token);
} catch (error) {
 console.error('Erreur lors de la connexion:', error);
 }
}
export {login}