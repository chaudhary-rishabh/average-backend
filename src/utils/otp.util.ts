import twilio from 'twilio';
import { config } from '../config/index';

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

export const sendSMS = async (to: string, body: string) => {
    await client.messages.create({
        body,
        from: config.twilio.phoneNumber,
        to,
    });
};