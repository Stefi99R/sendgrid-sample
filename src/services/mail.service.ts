import { MailService } from '@sendgrid/mail';
import {
   MailContact,
   RemoveUsersFromListEvent,
   AddUserToListEvent,
   GetContactsEvent,
} from '../interfaces/mail.interface';
import { mapSendGridGetResponsesToContactUsers } from '../helpers/mappers';
const client = require('@sendgrid/client');

export default class SendGridMailService {
   private readonly mailService: MailService;

   constructor() {
      this.mailService = new MailService();

      this.mailService.setApiKey(process.env.SENDGRID_API_KEY!);
   }

   /**
    * Adds a user to the SendGrid marketing list.
    * @param {AddUserToListEvent} event - Object containing the user's first name, last name, and email.
    * @returns {Promise<void>} - A promise that resolves when the user has been successfully added.
    */
   addUserToList = async (event: AddUserToListEvent): Promise<void> => {
      const data = {
         list_ids: [process.env.MARKETING_LIST_ID],
         contacts: [
            {
               first_name: event.firstName,
               last_name: event.lastName,
               email: event.email,
            },
         ],
      };

      const request = {
         url: '/v3/marketing/contacts',
         method: 'PUT',
         headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + process.env.SENDGRID_API_KEY,
         },
         body: data,
      } as any;

      try {
         await client.request(request);

         console.info('User added successfully!');
      } catch (error) {
         console.error(error);
      }
   };

   /**
    * Removes a user from the SendGrid marketing list.
    * @param {RemoveUsersFromListEvent} event - Object containing the IDs of users to remove.
    * @returns {Promise<void>} - A promise that resolves when the users have been successfully removed.
    */
   removeUserFromList = async (event: RemoveUsersFromListEvent): Promise<void> => {
      const queryParams = {
         ids: event.ids.join(', '),
      };

      const request = {
         url: '/v3/marketing/contacts',
         method: 'DELETE',
         headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + process.env.SENDGRID_API_KEY,
         },
         qs: queryParams,
      } as any;

      try {
         await client.request(request);

         console.info('Contacts successfully deleted!');
      } catch (error) {
         console.error(error);
      }
   };

   /**
    * Retrieves users by email from the SendGrid marketing list.
    * @param {GetContactsEvent} event - Object containing the emails to search for.
    * @returns {Promise<MailContact[]>} - A promise that resolves with an array of MailContact objects.
    */
   getUsersByEmails = async (event: GetContactsEvent): Promise<MailContact[]> => {
      const data = {
         emails: event.emails,
      };

      const request = {
         url: '/v3/marketing/contacts/search/emails',
         method: 'POST',
         headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + process.env.SENDGRID_API_KEY,
         },
         body: data,
      } as any;

      try {
         const responses = await client.request(request);

         return mapSendGridGetResponsesToContactUsers(responses);
      } catch (error) {
         throw error;
      }
   };
}
