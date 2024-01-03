import { MailContact } from '../interfaces/mail.interface';

export const mapSendGridGetResponsesToContactUsers = (responses: any[]): MailContact[] => {
   let contacts: MailContact[] = [];

   for (const response of responses) {
      if (!response?.body?.result) {
         continue;
      }

      for (const responseKey of Object.keys(response.body.result)) {
         contacts.push({
            id: response.body.result[responseKey].contact.id,
            first_name: response.body.result[responseKey].contact.first_name,
            last_name: response.body.result[responseKey].contact.last_name,
            email: response.body.result[responseKey].contact.email,
            alternate_emails: response.body.result[responseKey].contact.alternate_emails,
            address_line_1: response.body.result[responseKey].contact.address_line_1,
            address_line_2: response.body.result[responseKey].contact.address_line_2,
            city: response.body.result[responseKey].contact.city,
            country: response.body.result[responseKey].contact.country,
            state_province_region: response.body.result[responseKey].contact.state_province_region,
            postal_code: response.body.result[responseKey].contact.postal_code,
            phone_number: response.body.result[responseKey].contact.phone_number,
            whatsapp: response.body.result[responseKey].contact.whatsapp,
            line: response.body.result[responseKey].contact.line,
            facebook: response.body.result[responseKey].contact.facebook,
            list_ids: response.body.result[responseKey].contact.list_ids,
            segment_ids: response.body.result[responseKey].contact.segment_ids,
         });
      }
   }

   return contacts;
};
