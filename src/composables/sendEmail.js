import {ref} from "vue";

const send = ref(false);

const sendEmail = async (subject, body) => {
    send.value = false
    try {
        // eslint-disable-next-line no-undef
        await Email.send({
            SecureToken: 'a41cb56b-9fe5-4a1f-8eed-fc2cc4b1bd59',
            To: 'frontend.guy.contact@gmail.com',
            From: 'r3cenzialny@gmail.com',
            Subject: subject,
            Body: body,
        })

        send.value = true
    } catch (e) {
        send.value = e.message;
        send.value = false;
    }
}

const useSendEmail = () => {
    return {sendEmail, send}
}

export default useSendEmail;