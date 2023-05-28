import { MailService } from '@sendgrid/mail';
import {
   MailContact,
   RemoveUsersFromListEvent,
   AddUserToListEvent,
   GetContactsEvent,
} from '../interfaces/mail.interface';
import { mapSendgridGetResponsesToContactUsers } from '../helpers/mappers';
const client = require('@sendgrid/client');

export default class SendrgridMailService {
   private readonly mailService: MailService;

   constructor() {
      this.mailService = new MailService();

      this.mailService.setApiKey(process.env.SENDGRID_API_KEY!);
   }

   /**
    * Method that adds a user to a SendGrid marketing list.
    * @param event User details: first name, last name and email address.
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
    * Removes the users with the specified IDs from the marketing list.
    * @param event IDs of users that are to be deleted from the marketing list.
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
    * Method that fetches the users from a specific SendGrid list by email addresses.
    * @param emails List of email addresses of users to fetch.
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

         return mapSendgridGetResponsesToContactUsers(responses);
      } catch (error) {
         throw error;
      }
   };
}
