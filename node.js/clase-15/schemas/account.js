import yup from 'yup';

const AccountSchema = yup.object({
    email: yup.string().email().min(4).required(),
    password: yup.string().min(4).required(),
});

export {
    AccountSchema
}