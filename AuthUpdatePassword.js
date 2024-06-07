import { getAuth, updatePassword } from "firebase/auth";

export function updateUserPassword(newPassword) {
    const auth = getAuth();
    const user = auth.currentUser;

    return updatePassword(user, newPassword);
}
